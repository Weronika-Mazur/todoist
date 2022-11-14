import { QueryKey, useMutation, useQueryClient } from "react-query";
import { useAppDispatch } from "store/hooks";

import { updateListCount } from "../utils/helpers";
import { todoApi } from "../todoAPI/todoAPI";
import { Task, TaskContent } from "types/todo";
import { ErrorMessage } from "types/type";
import { setErrorMessage } from "features/app/appSlice";

export interface ChangeTaskProps {
  taskId: string;
  changes: TaskContent;
  todosQueryKey: QueryKey;
  listId: string;
}

const changeTaskFn = async ({ taskId, changes }: ChangeTaskProps) => {
  const returnedTask = await todoApi.updateTask(taskId, changes);

  if (!returnedTask) {
    throw Error("Couldn't change task");
  }

  return returnedTask;
};

export const useChangeTodo = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const changeTask = useMutation<Task, ErrorMessage, ChangeTaskProps>({
    mutationFn: changeTaskFn,
    onSuccess: (
      data: Task,
      { changes, todosQueryKey, listId }: ChangeTaskProps
    ) => {
      const currentTaskArray = queryClient.getQueryData<Task[]>(todosQueryKey);

      if (!currentTaskArray) throw new Error("No querry found");

      const newTaskArray = currentTaskArray.map((task) =>
        task.taskId === data.taskId ? data : task
      );

      if (changes.status) {
        const amount = data.status === "active" ? 1 : -1;
        updateListCount(queryClient, listId, amount);
      }
      queryClient.setQueryData(todosQueryKey, newTaskArray);
    },
    retry: false,
    onError: (err: any) => {
      const error = err.message || err;
      const errorMessage = `updating task. ${error}`;
      dispatch(setErrorMessage(errorMessage));
    },
  });

  return {
    changeTodo: changeTask.mutate,
    isChangingTodo: changeTask.isLoading,
  };
};
