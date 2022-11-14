import { useMutation, useQueryClient } from "react-query";
import { useAppDispatch } from "store/hooks";

import { AppsQueryKeys } from "utils/constants";
import { userApi } from "../userAPI/userAPI";
import { ErrorMessage, User } from "types/type";
import { setErrorMessage } from "features/app/appSlice";

const removeProfilePictureFn = async () => {
  const response = await userApi.removeProfilePicture();

  if (!response) {
    throw Error("Cannot connect to server");
  }

  return response;
};

export const useRemoveProfilePicture = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const removeProfilePicture = useMutation<User, ErrorMessage, undefined>(
    removeProfilePictureFn,
    {
      onSuccess: (data: User) => {
        queryClient.setQueryData(AppsQueryKeys.user, data);
      },
      retry: false,
      onError: (err: any) => {
        const error = err.message || err;
        const errorMessage = `removing picture. ${error}`;
        dispatch(setErrorMessage(errorMessage));
      },
    }
  );

  return {
    removeProfilePicture: removeProfilePicture.mutate,
    isRemovingProfilePicture: removeProfilePicture.isLoading,
  };
};
