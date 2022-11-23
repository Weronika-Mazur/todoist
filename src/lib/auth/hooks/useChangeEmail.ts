import { useMutation, useQueryClient } from "react-query";
import { useAppDispatch } from "store/hooks";

import { AppsQueryKeys } from "utils/constants";
import { userApi } from "../userAPI/userAPI";
import { ErrorMessage, User } from "types/type";
import { setErrorMessage } from "features/app/appSlice";
import { ChangeEmail } from "../types/type";

const changeEmailFn = async (changes: ChangeEmail) => {
  const response = await userApi.changeEmail(changes);

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

export const useChangeEmail = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const changeEmail = useMutation<User, ErrorMessage, ChangeEmail>(
    changeEmailFn,
    {
      onSuccess: (data: User) => {
        queryClient.setQueryData(AppsQueryKeys.user, data);
      },
      retry: false,
      onError: (err: any) => {
        const error = err.message || err;
        const errorMessage = `updating account. ${error}`;
        dispatch(setErrorMessage(errorMessage));
      },
    }
  );

  return {
    changeEmail: changeEmail.mutate,
    isChangingEmail: changeEmail.isLoading,
  };
};
