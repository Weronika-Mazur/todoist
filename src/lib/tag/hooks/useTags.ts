import { useQuery } from "react-query";
import { useAppDispatch } from "store/hooks";

import { AppsQueryKeys } from "utils/constants";
import { tagApi } from "../tagAPI/tagAPI";
import { Tag } from "types/tag";
import { ErrorMessage } from "types/type";
import { setErrorMessage } from "features/app/appSlice";

const fetchTagsFn = async () => {
  const data = await tagApi.getTags();

  if (!data) {
    throw Error("Couldn't get tasks");
  }

  return data;
};

export const useTags = () => {
  const dispatch = useAppDispatch();

  const query = useQuery<Tag[], ErrorMessage>({
    queryKey: AppsQueryKeys.tags,
    queryFn: () => fetchTagsFn(),
    retry: false,
    onError: (err: any) => {
      const error = err.message || err;
      const errorMessage = `fetching tags. ${error}`;
      dispatch(setErrorMessage(errorMessage));
    },
  });

  return query;
};
