import { render as rtlRender } from "@testing-library/react";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  configureStore,
  PreloadedState,
  StateFromReducersMapObject,
} from "@reduxjs/toolkit";
import jwt from "jsonwebtoken";

import todoReducer from "features/todo/todoSlice";
import listReducer from "features/list/listSlice";
import appReducer from "features/app/appSlice";

import { JWT_SECRET } from "./constants";
import { User } from "types/type";

interface WrapperProps {
  children: React.ReactNode;
}

const reducer = {
  todo: todoReducer,
  list: listReducer,
  app: appReducer,
};

type RootState = StateFromReducersMapObject<typeof reducer>;

interface RenderProps {
  route?: string;
  user?: User;
  preloadedState?: PreloadedState<RootState>;
}

export const loginAsUser = (user: User) => {
  const token = jwt.sign(user, JWT_SECRET);
  token && localStorage.setItem("jwt", token);
  return user;
};

export const render = async (
  ui: React.ReactElement,
  { route = "/home", user, preloadedState }: RenderProps = {}
) => {
  const queryClient = new QueryClient();
  const store = configureStore({
    reducer,
    preloadedState,
  });
  if (user) {
    loginAsUser(user);
  }

  window.history.pushState({}, "Test page", route);

  const Wrapper = ({ children }: WrapperProps) => (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Provider>
  );

  return rtlRender(ui, { wrapper: Wrapper });
};
