import { useMemo } from "react";
import { useQuery } from "react-query";
import { useAppDispatch } from "store/hooks";

import { AppsQueryKeys } from "utils/constants";
import { listApi } from "../listAPI/listAPI";
import { List } from "types/list";
import { ErrorMessage } from "types/type";
import { setErrorMessage } from "features/app/appSlice";

const fetchListArray = async () => {
  const data = await listApi.getLists();

  if (!data) {
    throw Error("Couldn't get lists");
  }

  return data;
};

export const useLists = () => {
  const dispatch = useAppDispatch();

  const query = useQuery<List[], ErrorMessage>({
    queryKey: AppsQueryKeys.lists,
    queryFn: () => fetchListArray(),
    retry: false,
    onError: (err: any) => {
      const error = err.message || err;
      const errorMessage = `fetching lists. ${error}`;
      dispatch(setErrorMessage(errorMessage));
    },
  });

  const getUsersLists = useMemo(
    () => query.data?.filter((list) => !list.inbox),
    [query.data]
  );

  const getInbox = useMemo(
    () => query.data?.find((list) => list.inbox),
    [query.data]
  );

  return { ...query, getInbox, getUsersLists };
};
