import { QueryClient } from "react-query";

import { List } from "types/list";
import { AppsQueryKeys } from "utils/constants";

export const updateListCount = (
  queryClient: QueryClient,
  listId: string,
  amount: number
) => {
  const lists = queryClient.getQueryData<List[]>(AppsQueryKeys.lists);
  if (!lists) throw new Error("No querry found");

  const updatedList = lists.map((list) =>
    list.listId === listId
      ? { ...list, activeCount: list.activeCount + amount }
      : list
  );

  queryClient.setQueryData(AppsQueryKeys.lists, updatedList);
};
