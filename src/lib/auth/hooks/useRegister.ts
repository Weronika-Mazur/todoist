import { useMutation, useQueryClient } from "react-query";
import { useAppDispatch } from "store/hooks";

import { AppsQueryKeys } from "utils/constants";
import { userApi } from "../userAPI/userAPI";
import { ErrorMessage, User, RegisterFormValues } from "types/type";
import { setErrorMessage } from "features/app/appSlice";

const registerFn = async (data: RegisterFormValues) => {
  const response = await userApi.register(data);

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

export const useRegister = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const register = useMutation<User | null, ErrorMessage, RegisterFormValues>(
    registerFn,
    {
      onSuccess: (data: User | null) => {
        queryClient.setQueryData(AppsQueryKeys.user, data);
      },
      retry: false,
      onError: (err: any) => {
        const error = err.message || err;
        const errorMessage = `registering. ${error}`;
        dispatch(setErrorMessage(errorMessage));
      },
    }
  );

  return { register: register.mutate, isRegistering: register.isLoading };
};
