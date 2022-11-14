import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "store/store";

import { EditMode } from "types/type";

interface State {
  editMode: EditMode;
}

const initialState: State = {
  editMode: {
    active: false,
    id: "",
  },
};

export const tagSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {
    activateTagEditMode: (state: State, action: PayloadAction<string>) => {
      state.editMode = {
        active: true,
        id: action.payload,
      };
    },
    deactivateTagEditMode: (state: State) => {
      state.editMode = {
        active: false,
        id: "",
      };
    },
    resetTag: () => initialState,
  },
});

export const selectTagEditModeId = (state: RootState): string => {
  return state.tag.editMode.id;
};

export const { resetTag, activateTagEditMode, deactivateTagEditMode } =
  tagSlice.actions;

export default tagSlice.reducer;
