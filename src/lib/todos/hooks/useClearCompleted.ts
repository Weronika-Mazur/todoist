import { useMutation, useQueryClient } from "react-query";
import { useAppDispatch } from "store/hooks";

import { AppsQueryKeys } from "utils/constants";
import { Task, TaskFilters } from "types/todo";
import { ErrorMessage } from "types/type";
import { todoApi } from "../todoAPI/todoAPI";
import { setErrorMessage } from "features/app/appSlice";

const clearCompletedFn = async (filters: TaskFilters) => {
  const { listId, ...taskFilters } = filters;

  const deletedTaskArray = await todoApi.clearCompleted(listId, taskFilters);

  if (!deletedTaskArray) {
    throw Error("Couldn't clear tasks");
  }

  return deletedTaskArray;
};

export const useClearCompleted = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const clearCompleted = useMutation<Task[], ErrorMessage, TaskFilters>({
    mutationFn: clearCompletedFn,
    onSuccess: (data: Task[], filters: TaskFilters) => {
      if (data.length === 0) {
        return;
      }
      const currentTaskArray: Task[] | undefined = queryClient.getQueryData([
        AppsQueryKeys.todos,
        filters,
      ]);
      if (!currentTaskArray) throw new Error("No querry found");

      const newTaskArray = currentTaskArray.filter(
        (task) =>
          !data.find((deletedTask) => deletedTask.taskId === task.taskId)
      );
      queryClient.setQueryData([AppsQueryKeys.todos, filters], newTaskArray);
    },
    retry: false,
    onError: (err: any) => {
      const error = err.message || err;
      const errorMessage = `clearing tasks. ${error}`;
      dispatch(setErrorMessage(errorMessage));
    },
  });

  return {
    clearCompleted: clearCompleted.mutate,
    isClearingCompleted: clearCompleted.isLoading,
  };
};
