import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "features/todo/todoSlice";
import listReducer from "features/list/listSlice";
import userSlice from "features/user/userSlice";

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    list: listReducer,
    user: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
