import { useMutation } from "react-query";
import { useAppDispatch } from "store/hooks";

import { userApi } from "../userAPI/userAPI";
import { ErrorMessage, User } from "types/type";
import { setErrorMessage } from "features/app/appSlice";
import { useLogout } from "./useLogout";

const deleteUserFn = async (password: string) => {
  const response = await userApi.deleteUser(password);

  if (!response) {
    throw Error("Cannot connect to server");
  }

  return response;
};

export const useDeleteUser = () => {
  const dispatch = useAppDispatch();
  const { logout } = useLogout();

  const deleteUser = useMutation<User, ErrorMessage, string>(deleteUserFn, {
    onSuccess: () => {
      logout();
    },
    retry: false,
    onError: (err: any) => {
      const error = err.message || err;
      const errorMessage = `deleting user. ${error}`;
      dispatch(setErrorMessage(errorMessage));
    },
  });

  return {
    deleteUser: deleteUser.mutate,
    isDeletingUser: deleteUser.isLoading,
  };
};
