import { useMutation, useQueryClient } from "react-query";
import { useAppDispatch } from "store/hooks";

import { AppsQueryKeys } from "utils/constants";
import { userApi } from "../userAPI/userAPI";
import { ErrorMessage, User } from "types/type";
import { setErrorMessage } from "features/app/appSlice";

const updateUserFn = async (changes: FormData) => {
  const response = await userApi.updateAccount(changes);

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

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const updateUser = useMutation<User, ErrorMessage, FormData>(updateUserFn, {
    onSuccess: (data: User) => {
      queryClient.setQueryData(AppsQueryKeys.user, data);
    },
    retry: false,
    onError: (err: any) => {
      const error = err.message || err;
      const errorMessage = `updating account. ${error}`;
      dispatch(setErrorMessage(errorMessage));
    },
  });

  return {
    updateUser: updateUser.mutate,
    isUpdatingUser: updateUser.isLoading,
  };
};
