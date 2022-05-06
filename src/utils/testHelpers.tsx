import { render } from "@testing-library/react";
import { Provider } from "react-redux";

import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "features/todo/todoSlice";
import listReducer from "features/list/listSlice";
import userSlice from "features/user/userSlice";

interface WrapperProps {
  children: React.ReactNode;
}

export const renderWithState = (ui: React.ReactElement, initialState = {}) => {
  const store = configureStore({
    reducer: {
      todo: todoReducer,
      list: listReducer,
      user: userSlice,
    },
    preloadedState: {
      ...initialState,
    },
  });
  const Wrapper = ({ children }: WrapperProps) => (
    <Provider store={store}>{children}</Provider>
  );

  return render(ui, { wrapper: Wrapper });
};
