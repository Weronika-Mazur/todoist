import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "store/store";

import { List, ListColors, SelectedList } from "types/list";
import { Modal } from "types/type";

interface State {
  activeListID: string;

  selectedList: SelectedList;
}

const initialState: State = {
  activeListID: "",

  selectedList: {
    id: "",
    name: "",
    color: ListColors.GREEN,
  },
};

export const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    setActiveListID: (state: State, action: PayloadAction<string>) => {
      state.activeListID = action.payload;
    },

    activateListEditMode: (state: State, action: PayloadAction<List>) => {
      const list = action.payload;
      state.selectedList = {
        name: list.name,
        color: list.color,
        id: list.listId,
      };
    },
    deactivateListEditMode: (state: State) => {
      state.selectedList = {
        id: "",
        name: "",
        color: ListColors.GREEN,
      };
    },
    resetList: () => initialState,
  },
});

export const selectActiveListID = (state: RootState): string => {
  return state.list.activeListID;
};

export const selectSelectedList = (state: RootState): SelectedList => {
  return state.list.selectedList;
};

export const {
  setActiveListID,

  activateListEditMode,
  deactivateListEditMode,
  resetList,
} = listSlice.actions;

export default listSlice.reducer;
