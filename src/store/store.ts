import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "features/todo/todoSlice";
import listReducer from "features/list/listSlice";
import tagSlice from "features/tag/tagSlice";
import appSlice from "features/app/appSlice";

export const store = configureStore({
  reducer: {
    app: appSlice,
    todo: todoReducer,
    list: listReducer,

    tag: tagSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
