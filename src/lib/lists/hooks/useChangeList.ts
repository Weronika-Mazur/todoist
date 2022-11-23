import { useMutation, useQueryClient } from "react-query";
import { useAppDispatch } from "store/hooks";

import { AppsQueryKeys } from "utils/constants";
import { listApi } from "../listAPI/listAPI";
import { List, ListContent } from "types/list";
import { ErrorMessage } from "types/type";
import { setErrorMessage } from "features/app/appSlice";

interface UpdateListProps {
  newList: ListContent;
  listId: string;
}

const updateListFn = async ({ newList, listId }: UpdateListProps) => {
  const returnedList = await listApi.updateList(newList, listId);

  if (!returnedList) {
    throw Error("Couldn't update list");
  }

  return returnedList;
};

export const useChangeList = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const updateList = useMutation<List, ErrorMessage, UpdateListProps>({
    mutationFn: updateListFn,
    onSuccess: (data: List) => {
      const currentListsArray: List[] | undefined = queryClient.getQueryData(
        AppsQueryKeys.lists
      );
      if (!currentListsArray) throw new Error("No querry found");

      const newListsArray = currentListsArray.map((list) =>
        list.listId === data.listId
          ? { ...data, activeCount: list.activeCount }
          : list
      );

      queryClient.setQueryData(AppsQueryKeys.lists, newListsArray);
    },
    retry: false,
    onError: (err: any) => {
      const error = err.message || err;
      const errorMessage = `updating list. ${error}`;
      dispatch(setErrorMessage(errorMessage));
    },
  });

  return {
    changeList: updateList.mutate,
    isChangingList: updateList.isLoading,
  };
};
