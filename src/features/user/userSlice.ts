import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "store/store";
import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { userApi } from "../../services/userAPI";
import { LoginFormValues, RegisterFormValues } from "../../types/type";
import { setErrorMessage } from "features/todo/todoSlice";

interface State {
  userName: string;
  email: string;
  isSubmitted: boolean;
}

const initialState: State = {
  userName: "",
  email: "",
  isSubmitted: false,
};

export const userSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    setUserName: (state: State, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
    setEmail: (state: State, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setIsSubmitted: (state: State, action: PayloadAction<boolean>) => {
      state.isSubmitted = action.payload;
    },
    resetUser: () => initialState,
  },
});

export const selectUserName = (state: RootState): string => {
  return state.user.userName;
};

export const selectEmail = (state: RootState): string => {
  return state.user.email;
};

export const selectIsSubmitted = (state: RootState): boolean => {
  return state.user.isSubmitted;
};

type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;

type TodoAppThunk = AppThunk<Promise<void | undefined>>;

export const login = (values: LoginFormValues): TodoAppThunk => {
  return async (dispatch) => {
    try {
      const response = await userApi.login(values);

      if (!response) {
        throw Error("Cannot connect to server");
      }

      if (response.error) {
        throw response.error;
      }

      const { token } = response;

      if (!token) {
        throw Error("Error authenticating");
      }

      localStorage.setItem("jwt", token);
      dispatch(setIsSubmitted(true));
    } catch (e: any) {
      const error = e.message || e;
      const errorMessage = `loging in. ${error}`;
      dispatch(setErrorMessage(errorMessage));
    }
  };
};

export const register = (values: RegisterFormValues): TodoAppThunk => {
  return async (dispatch) => {
    try {
      const response = await userApi.register(values);

      if (!response) {
        throw Error("Cannot connect to server");
      }

      if (response.error) {
        throw response.error;
      }

      const { token } = response;

      if (!token) {
        throw Error("Error authenticating");
      }

      localStorage.setItem("jwt", token);
      dispatch(setIsSubmitted(true));
    } catch (e: any) {
      const error = e.message || e;
      const errorMessage = `signing up. ${error}`;
      dispatch(setErrorMessage(errorMessage));
    }
  };
};

export const { setUserName, setEmail, setIsSubmitted, resetUser } =
  userSlice.actions;

export default userSlice.reducer;
