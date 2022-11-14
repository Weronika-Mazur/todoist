import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "store/store";

import { Modal } from "types/type";

interface State {
  showModal: Modal;
  errorMessage: string;
}

const initialState: State = {
  showModal: undefined,
  errorMessage: "",
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setShowModal: (state: State, action: PayloadAction<Modal>) => {
      state.showModal = action.payload;
    },
    setErrorMessage: (
      state: State,
      action: PayloadAction<string | undefined>
    ) => {
      state.errorMessage = action.payload || "";
    },
    resetApp: () => initialState,
  },
});

export const selectShowModal = (state: RootState): Modal => {
  return state.app.showModal;
};

export const selectErrorMessage = (state: RootState): string => {
  return state.app.errorMessage;
};

export const { setShowModal, setErrorMessage } = appSlice.actions;

export default appSlice.reducer;
