import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "store/store";
import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";

import { listApi } from "services/listAPI";

import { List, ListColors, ListContent, SelectedList, Modal } from "types/type";
import {
  setErrorMessage,
  setIsLoading,
  fetchTaskArray,
} from "features/todo/todoSlice";

interface State {
  activeListID: string;
  listArray: List[];
  inbox: List;
  showModal: Modal;
  selectedList: SelectedList;
}

const initialState: State = {
  activeListID: "",
  listArray: [],
  inbox: {
    listId: "",
    name: "Inbox",
    owner: "",
    color: ListColors.sky,
    activeCount: 0,
  },
  showModal: undefined,
  selectedList: {
    id: "",
    name: "",
    color: ListColors.green,
  },
};

export const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    setActiveListID: (state: State, action: PayloadAction<string>) => {
      state.activeListID = action.payload;
    },
    setListArray: (state: State, action: PayloadAction<List[]>) => {
      state.listArray = action.payload;
    },
    setInbox: (state: State, action: PayloadAction<List>) => {
      state.inbox = action.payload;
    },
    updateActiveCount(state: State, action: PayloadAction<number>) {
      if (state.activeListID === state.inbox.listId) {
        state.inbox = {
          ...state.inbox,
          activeCount: state.inbox.activeCount + action.payload,
        };
      } else {
        state.listArray = state.listArray.map((list) =>
          list.listId === state.activeListID
            ? { ...list, activeCount: list.activeCount + action.payload }
            : list
        );
      }
    },
    setShowModal: (state: State, action: PayloadAction<Modal>) => {
      state.showModal = action.payload;
    },
    activateListEditMode: (state: State, action: PayloadAction<string>) => {
      const checkId = (list: List) => list.listId === action.payload;
      const index = state.listArray.findIndex(checkId);
      if (index !== -1) {
        const targetList = state.listArray[index];
        state.selectedList = {
          name: targetList.name,
          color: targetList.color,
          id: targetList.listId,
        };
      }
    },
    deactivateListEditMode: (state: State) => {
      state.selectedList = {
        id: "",
        name: "",
        color: ListColors.green,
      };
    },
    resetList: () => initialState,
  },
});

export const selectActiveListID = (state: RootState): string => {
  return state.list.activeListID;
};

export const selectListArray = (state: RootState): List[] => {
  return state.list.listArray;
};

export const selectInbox = (state: RootState): List => {
  return state.list.inbox;
};

export const selectShowModal = (state: RootState): Modal => {
  return state.list.showModal;
};

export const selectSelectedList = (state: RootState): SelectedList => {
  return state.list.selectedList;
};

type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;

type TodoAppThunk = AppThunk<Promise<List[] | undefined>>;
export type ListAppThunk = AppThunk<Promise<List | undefined>>;

export const fetchListArray = (): TodoAppThunk => {
  return async (dispatch) => {
    try {
      dispatch(setIsLoading(true));
      const data = await listApi.getLists();

      if (!data) {
        throw Error("Couldn't get lists");
      }

      const inbox = data.shift();

      if (!inbox) {
        throw Error("Couldn't get inbox");
      }

      dispatch(setInbox(inbox));
      dispatch(setListArray(data));

      dispatch(changeActiveListID(inbox.listId));

      dispatch(setErrorMessage(""));
      return data;
    } catch (err: any) {
      const errorMessage = `trying to get lists. ${err.message}`;
      dispatch(setErrorMessage(errorMessage));
    } finally {
      dispatch(setIsLoading(false));
    }
  };
};

export const addList = (newList: ListContent): ListAppThunk => {
  return async (dispatch, getState) => {
    try {
      dispatch(setIsLoading(true));
      const returnedList = await listApi.addList(newList);

      if (!returnedList) {
        throw Error("Couldn't create list");
      }

      const currentListArray: List[] = getState().list.listArray;

      dispatch(setListArray([...currentListArray, returnedList]));
      dispatch(changeActiveListID(returnedList.listId));

      return returnedList;
    } catch (err: any) {
      const errorMessage = `creating list. ${err.message}`;
      dispatch(setErrorMessage(errorMessage));
    } finally {
      dispatch(setIsLoading(false));
    }
  };
};

export const updateList = (newList: ListContent, id: string): ListAppThunk => {
  return async (dispatch, getState) => {
    try {
      dispatch(setIsLoading(true));
      const returnedList = await listApi.updateList(newList, id);

      if (!returnedList) {
        throw Error("Couldn't update list");
      }

      const currentListArray: List[] = getState().list.listArray;

      dispatch(
        setListArray(
          currentListArray.map((list) =>
            list.listId === returnedList.listId
              ? { ...returnedList, activeCount: list.activeCount }
              : list
          )
        )
      );

      return returnedList;
    } catch (err: any) {
      const errorMessage = `updating list. ${err.message}`;
      dispatch(setErrorMessage(errorMessage));
    } finally {
      dispatch(setIsLoading(false));
    }
  };
};

export const deleteList = (id: string): ListAppThunk => {
  return async (dispatch, getState) => {
    try {
      dispatch(setIsLoading(true));
      const returnedList = await listApi.deleteList(id);

      if (!returnedList) {
        throw Error("Couldn't delete list");
      }

      const currentListArray: List[] = getState().list.listArray;

      dispatch(
        setListArray(
          currentListArray.filter((list) => list.listId !== returnedList.listId)
        )
      );
      const activeListID = getState().list.activeListID;
      if (activeListID === returnedList.listId) {
        dispatch(changeActiveListID(getState().list.inbox.listId));
      }
      return returnedList;
    } catch (err: any) {
      const errorMessage = `deleting list. ${err.message}`;
      dispatch(setErrorMessage(errorMessage));
    } finally {
      dispatch(setIsLoading(false));
    }
  };
};

export const changeActiveListID = (
  listId: string
): AppThunk<Promise<void | undefined>> => {
  return async (dispatch) => {
    dispatch(setActiveListID(listId));
    dispatch(fetchTaskArray());
  };
};

export const {
  setActiveListID,
  setListArray,
  setInbox,
  updateActiveCount,
  setShowModal,
  activateListEditMode,
  deactivateListEditMode,
  resetList,
} = listSlice.actions;

export default listSlice.reducer;
