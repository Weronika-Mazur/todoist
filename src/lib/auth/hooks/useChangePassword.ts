import { useMutation } from "react-query";
import { useAppDispatch } from "store/hooks";

import { userApi } from "../userAPI/userAPI";
import { ErrorMessage, User } from "types/type";
import { setErrorMessage } from "features/app/appSlice";
import { ChangePassword } from "../types/type";

const changePasswordFn = async (changes: ChangePassword) => {
  const response = await userApi.changePassword(changes);

  if (!response) {
    throw Error("Cannot connect to server");
  }

  //   if (response.error) {
  //     throw response.error;
  //   }
  //   const { token, user } = response;

  //   if (!token || !user) {
  //     throw Error("Error authenticating");
  //   }

  //   token && localStorage.setItem("jwt", token);
  //   return user;
};

export const useChangePassword = () => {
  const dispatch = useAppDispatch();

  const changePassword = useMutation<void, ErrorMessage, ChangePassword>(
    changePasswordFn,
    {
      retry: false,
      onError: (err: any) => {
        const error = err.message || err;
        const errorMessage = `updating account. ${error}`;
        dispatch(setErrorMessage(errorMessage));
      },
    }
  );

  return {
    changePassword: changePassword.mutate,
    isChangingPassword: changePassword.isLoading,
  };
};
