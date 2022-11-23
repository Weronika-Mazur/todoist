import { useAppDispatch } from "store/hooks";
import { activateTaskEditMode } from "features/todo/todoSlice";

import * as S from "./styles";
import { Priority, TaskFilters, TaskStatus } from "types/todo";
import { getDateString } from "utils/helpers";

import { useChangeTodo, useDeleteTodo } from "lib/todos";
import { Tag } from "types/tag";
import { AppsQueryKeys } from "utils/constants";

interface TaskItemProps {
  content: string;
  status: TaskStatus;
  taskId: string;
  listId: string;
  tags?: Tag[];
  dueDate?: Date;
  priority: Priority;
  filters: TaskFilters;
}

const TaskItem = ({
  content,
  status,
  taskId,
  listId,
  tags,
  dueDate,
  priority,
  filters,
}: TaskItemProps) => {
  const dispatch = useAppDispatch();

  const { deleteTodo } = useDeleteTodo();
  const { changeTodo } = useChangeTodo();
  const todosQueryKey = [AppsQueryKeys.todos, filters];

  const handleDeleteTask = () => {
    deleteTodo({ taskId, listId, todosQueryKey });
  };

  const handleEditTask = () => {
    dispatch(activateTaskEditMode(taskId));
  };

  const handleToggleItemState = () => {
    const taskStatus = status === "active" ? "completed" : "active";

    changeTodo({
      taskId,
      todosQueryKey,
      listId,
      changes: {
        status: taskStatus,
      },
    });
  };

  const schedule = getDateString(dueDate);

  const TaskDetails =
    dueDate || tags ? (
      <S.TaskDetailsContainer>
        {dueDate && (
          <S.DetailsItemContainer>
            <S.TaskTomorrowIcon $status={status} />
            <S.DetailsText $status={status}>{schedule}</S.DetailsText>
          </S.DetailsItemContainer>
        )}
        {tags?.map((tag) => (
          <S.DetailsItemContainer key={tag.tagId}>
            <S.TaskTagIcon $status={status} />
            <S.DetailsText $status={status}>{tag.content}</S.DetailsText>
          </S.DetailsItemContainer>
        ))}
      </S.TaskDetailsContainer>
    ) : null;

  return (
    <S.Task>
      <S.TaskItemContainer>
        <S.TaskButton
          $status={status}
          $color={priority}
          onClick={handleToggleItemState}
          data-testid={`task-button-${taskId}`}
        >
          <S.Circle></S.Circle>
        </S.TaskButton>
        <S.TaskText $status={status}>{content}</S.TaskText>
        <S.EditButton
          onClick={handleEditTask}
          data-testid={`edit-button-${taskId}`}
        >
          <S.GreyEditIcon />
        </S.EditButton>
        <S.CrossButton
          onClick={handleDeleteTask}
          data-testid={`cross-button-${taskId}`}
        >
          <S.GreyCrossIcon />
        </S.CrossButton>
      </S.TaskItemContainer>
      {TaskDetails}
    </S.Task>
  );
};

export default TaskItem;
