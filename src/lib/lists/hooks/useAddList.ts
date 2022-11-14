import { useMutation, useQueryClient } from "react-query";
import { useAppDispatch } from "store/hooks";

import { AppsQueryKeys } from "utils/constants";
import { listApi } from "../listAPI/listAPI";
import { List, ListContent } from "types/list";
import { ErrorMessage } from "types/type";
import { setErrorMessage } from "features/app/appSlice";

const addListFn = async (newList: ListContent) => {
  const returnedList = await listApi.addList(newList);

  if (!returnedList) {
    throw Error("Couldn't create list");
  }

  return returnedList;
};

export const useAddList = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const addList = useMutation<List, ErrorMessage, ListContent>(addListFn, {
    onSuccess: (data: List) => {
      const currentListsArray: List[] | undefined = queryClient.getQueryData(
        AppsQueryKeys.lists
      );

      if (!currentListsArray) throw new Error("No querry found");

      const newListsArray = [...currentListsArray, data];

      queryClient.setQueryData(AppsQueryKeys.lists, newListsArray);
    },
    retry: false,
    onError: (err: any) => {
      const error = err.message || err;
      const errorMessage = `creating list. ${error}`;
      dispatch(setErrorMessage(errorMessage));
    },
  });

  return { addList: addList.mutate, isAddingList: addList.isLoading };
};
