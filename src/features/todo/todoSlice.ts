import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "store/store";

import { EditMode, Filter } from "types/type";

interface State {
  taskFilter: Filter;

  editMode: EditMode;
}

const initialState: State = {
  taskFilter: "all",

  editMode: {
    active: false,
    id: "",
  },
};

export const todoSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setFilter: (state: State, action: PayloadAction<Filter>) => {
      state.taskFilter = action.payload;
    },

    activateTaskEditMode: (state: State, action: PayloadAction<string>) => {
      state.editMode = {
        active: true,
        id: action.payload,
      };
    },
    deactivateTaskEditMode: (state: State) => {
      state.editMode = {
        active: false,
        id: "",
      };
    },
    resetTodo: () => initialState,
  },
});

// selectors

export const selectTaskFilter = (state: RootState): Filter => {
  return state.todo.taskFilter;
};

export const selectTaskEditModeId = (state: RootState): string => {
  return state.todo.editMode.id;
};

// async

export const {
  setFilter,

  activateTaskEditMode,
  deactivateTaskEditMode,
  resetTodo,
} = todoSlice.actions;

export default todoSlice.reducer;
