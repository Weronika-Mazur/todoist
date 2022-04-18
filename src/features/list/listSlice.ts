import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "store/store";
import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";

import { listApi } from "services/listAPI";

import { List } from "types/type";
import {
  setErrorMessage,
  setIsLoading,
  fetchTaskArray,
} from "features/todo/todoSlice";

interface State {
  activeListID: string;
  listArray: List[];
  inbox: List;
}

const initialState: State = {
  activeListID: "",
  listArray: [],
  inbox: {
    listId: "",
    name: "Inbox",
    owner: "",
    color: 1,
    activeCount: 0,
  },
};

export const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    setActiveListID: (state, action: PayloadAction<string>) => {
      state.activeListID = action.payload;
    },
    setListArray: (state, action: PayloadAction<List[]>) => {
      state.listArray = action.payload;
    },
    setInbox: (state, action: PayloadAction<List>) => {
      state.inbox = action.payload;
    },
    updateActiveCount(state, action: PayloadAction<number>) {
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

type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;

type TodoAppThunk = AppThunk<Promise<List[] | undefined>>;

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
    } catch (err) {
      dispatch(setErrorMessage("trying to get lists"));
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

export const { setActiveListID, setListArray, setInbox, updateActiveCount } =
  listSlice.actions;

export default listSlice.reducer;
