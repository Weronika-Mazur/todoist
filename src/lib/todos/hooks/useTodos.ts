import { useQuery } from "react-query";
import { useAppDispatch } from "store/hooks";

import { AppsQueryKeys } from "utils/constants";
import { todoApi } from "../todoAPI/todoAPI";
import { Task, TaskFilters } from "types/todo";
import { ErrorMessage, Filter } from "types/type";
import { setErrorMessage } from "features/app/appSlice";

interface UseTodosProps {
  filters: TaskFilters;
  enabled?: boolean;
}

export const fetchTaskArray = async (filters: TaskFilters) => {
  const { listId, ...taskFilters } = filters;

  const data = await todoApi.getTasks(listId, taskFilters);

  if (!data) {
    throw Error("Couldn't get tasks");
  }

  return data;
};

export const useTodos = ({ filters, enabled = true }: UseTodosProps) => {
  const dispatch = useAppDispatch();

  const query = useQuery<Task[], ErrorMessage>({
    queryKey: [AppsQueryKeys.todos, filters],
    queryFn: () => fetchTaskArray(filters),
    retry: false,
    onError: (err: any) => {
      const error = err.message || err;
      const errorMessage = `fetching tasks. ${error}`;
      dispatch(setErrorMessage(errorMessage));
    },
    enabled,
  });

  const activeItemsCounter = query.data?.filter(
    (task: Task) => task.status === "active"
  ).length;

  const getArrayWithFilters = (taskFilter: Filter) =>
    taskFilter === "all"
      ? query.data
      : query.data?.filter((task: Task) => task.status === taskFilter);

  return { ...query, activeItemsCounter, getArrayWithFilters };
};
