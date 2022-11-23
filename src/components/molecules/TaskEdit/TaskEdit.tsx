import { useState } from "react";
import { useAppDispatch } from "store/hooks";

import Button from "components/atoms/Button/Button";
import TaskDetails from "../TaskDetails/TaskDetails";

import { deactivateTaskEditMode } from "features/todo/todoSlice";

import * as S from "./styles";
import { toDate } from "utils/helpers";
import { AppsQueryKeys } from "utils/constants";
import { useChangeTodo } from "lib/todos";

import { NewTask, Priority, TaskFilters } from "types/todo";
import { Tag } from "types/tag";

interface TaskEditProps {
  content: string;
  taskId: string;
  listId: string;
  tags?: Tag[];
  dueDate?: Date;
  priority: Priority;
  filters: TaskFilters;
}

const TaskEdit = ({
  content,
  taskId,
  listId,
  tags,
  dueDate,
  priority,
  filters,
}: TaskEditProps) => {
  const dispatch = useAppDispatch();

  const [newTask, setNewTask] = useState({
    content: content,
    priority: priority,
    dueDate: dueDate,
    tags: tags ?? [],
  } as NewTask);
  const { changeTodo } = useChangeTodo();
  const todosQueryKey = [AppsQueryKeys.todos, filters];

  const handleEndEditing = async () => {
    changeTodo(
      {
        taskId,
        todosQueryKey,
        listId,
        changes: newTask,
      },
      {
        onSuccess: () => {
          dispatch(deactivateTaskEditMode());
        },
      }
    );
  };

  const handleCancelEdit = () => {
    dispatch(deactivateTaskEditMode());
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask({ ...newTask, content: e.target.value });
  };

  const handleSetDate = (newDate?: Date) => {
    setNewTask({ ...newTask, dueDate: newDate?.toLocaleDateString("en-CA") });
  };

  const handleSetPriority = (priority = Priority.P1) => {
    setNewTask({ ...newTask, priority });
  };

  const handleSetTaskTags = (newSet: Tag[]) => {
    setNewTask({ ...newTask, tags: newSet });
  };

  return (
    <>
      <S.EditContainer>
        <S.InputContainer>
          <S.EditInput
            type="text"
            value={newTask.content}
            maxLength={200}
            onChange={handleTextChange}
            autoFocus
          />
        </S.InputContainer>
        <TaskDetails
          date={toDate(newTask.dueDate)}
          handleSetDate={handleSetDate}
          priority={newTask.priority}
          handleSetPriority={handleSetPriority}
          taskTags={newTask.tags}
          handleSetTaskTags={handleSetTaskTags}
        />
        <S.ButtonContainer>
          <Button text="confirm" onClick={handleEndEditing} />
          <Button variant="outlined" text="cancel" onClick={handleCancelEdit} />
        </S.ButtonContainer>
      </S.EditContainer>
    </>
  );
};

export default TaskEdit;
