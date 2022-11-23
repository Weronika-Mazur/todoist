import { useMutation, useQueryClient } from "react-query";
import { useAppDispatch } from "store/hooks";

import { AppsQueryKeys } from "utils/constants";
import { updateListCount } from "../utils/helpers";
import { todoApi } from "../todoAPI/todoAPI";
import { Task, TaskContent } from "types/todo";
import { ErrorMessage } from "types/type";
import { setErrorMessage } from "features/app/appSlice";

interface AddTaskProps {
  listId: string;
  newTask: TaskContent;
}

const addTaskFn = async ({ listId, newTask }: AddTaskProps) => {
  const returnedTask = await todoApi.addTask(listId, newTask);

  if (!returnedTask) {
    throw Error("Couldn't add task");
  }

  return returnedTask;
};

export const useAddTodo = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const addTask = useMutation<Task, ErrorMessage, AddTaskProps>({
    mutationFn: addTaskFn,
    onSuccess: (data: Task, { listId }: AddTaskProps) => {
      const currentTaskArray = queryClient.getQueryData<Task[]>([
        AppsQueryKeys.todos,
        { listId },
      ]);

      if (!currentTaskArray) throw new Error("No querry found");

      const newTaskArray = [...currentTaskArray, data];

      updateListCount(queryClient, listId, 1);

      queryClient.setQueryData([AppsQueryKeys.todos, { listId }], newTaskArray);
    },
    retry: false,
    onError: (err: any) => {
      const error = err.message || err;
      const errorMessage = `adding task. ${error}`;
      dispatch(setErrorMessage(errorMessage));
    },
  });
  return { addTask: addTask.mutate, isAddingTask: addTask.isLoading };
};
