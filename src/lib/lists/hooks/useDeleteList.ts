import { useMutation, useQueryClient } from "react-query";
import { useAppDispatch } from "store/hooks";

import { AppsQueryKeys } from "utils/constants";
import { listApi } from "../listAPI/listAPI";
import { List } from "types/list";
import { ErrorMessage } from "types/type";
import { setErrorMessage } from "features/app/appSlice";

const deleteListFn = async (listId: string) => {
  const returnedList = await listApi.deleteList(listId);

  if (!returnedList) {
    throw Error("Couldn't delete list");
  }

  return returnedList;
};

export const useDeleteList = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const deleteList = useMutation<List, ErrorMessage, string>({
    mutationFn: deleteListFn,
    onSuccess: (data: List) => {
      const currentListsArray: List[] | undefined = queryClient.getQueryData(
        AppsQueryKeys.lists
      );
      if (!currentListsArray) throw new Error("No querry found");

      const newListsArray = currentListsArray.filter(
        (list) => list.listId !== data.listId
      );
      queryClient.setQueryData(AppsQueryKeys.lists, newListsArray);
    },

    retry: false,
    onError: (err: any) => {
      const error = err.message || err;
      const errorMessage = `deleting list. ${error}`;
      dispatch(setErrorMessage(errorMessage));
    },
  });

  return {
    deleteList: deleteList.mutate,
    isDeletingList: deleteList.isLoading,
  };
};
