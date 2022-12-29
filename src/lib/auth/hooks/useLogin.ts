import { useMutation, useQueryClient } from "react-query";
import { useAppDispatch } from "store/hooks";

import { AppsQueryKeys } from "utils/constants";
import { userApi } from "../userAPI/userAPI";
import { LoginFormValues } from "types/type";
import { ErrorMessage, User } from "types/type";
import { setErrorMessage } from "features/app/appSlice";

const loginFn = async (data: LoginFormValues) => {
  const response = await userApi.login(data);
  if (!response) {
    throw Error("Cannot connect to server");
  }

  if (response.error) {
    throw response.error;
  }

  const { token, user } = response;

  if (!token || !user) {
    throw Error("Error authenticating");
  }

  token && localStorage.setItem("jwt", token);
  return user;
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const login = useMutation<User | null, ErrorMessage, LoginFormValues>(
    loginFn,
    {
      onSuccess: (data: User | null) => {
        queryClient.setQueryData(AppsQueryKeys.user, data);
      },
      retry: false,
      onError: (err: any) => {
        const error = err.message || err;
        const errorMessage = `loging in. ${error}`;
        dispatch(setErrorMessage(errorMessage));
      },
    }
  );

  return { login: login.mutate, isLogingIn: login.isLoading };
};
