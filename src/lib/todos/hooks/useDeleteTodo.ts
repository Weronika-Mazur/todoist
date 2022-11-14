import { QueryKey, useMutation, useQueryClient } from "react-query";
import { useAppDispatch } from "store/hooks";

import { updateListCount } from "../utils/helpers";
import { todoApi } from "../todoAPI/todoAPI";
import { ErrorMessage } from "types/type";
import { Task } from "types/todo";
import { setErrorMessage } from "features/app/appSlice";

export interface DeleteTaskProps {
  taskId: string;
  todosQueryKey: QueryKey;
  listId: string;
}

const deleteTaskFn = async ({ taskId }: DeleteTaskProps) => {
  const returnedTask = await todoApi.deleteTask(taskId);

  if (!returnedTask) {
    throw Error("Couldn't delete task");
  }

  return returnedTask;
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const deleteTask = useMutation<Task, ErrorMessage, DeleteTaskProps>({
    mutationFn: deleteTaskFn,
    onSuccess: (data: Task, { todosQueryKey, listId }: DeleteTaskProps) => {
      const currentTaskArray = queryClient.getQueryData<Task[]>(todosQueryKey);

      if (!currentTaskArray) throw new Error("No querry found");

      const newTaskArray = currentTaskArray.filter(
        (task) => task.taskId !== data.taskId
      );

      if (data.status === "active") {
        updateListCount(queryClient, listId, -1);
      }

      queryClient.setQueryData(todosQueryKey, newTaskArray);
    },
    retry: false,
    onError: (err: any) => {
      const error = err.message || err;
      const errorMessage = `deleting task. ${error}`;
      dispatch(setErrorMessage(errorMessage));
    },
  });

  return {
    deleteTodo: deleteTask.mutate,
    isDeletingTodo: deleteTask.isLoading,
  };
};
