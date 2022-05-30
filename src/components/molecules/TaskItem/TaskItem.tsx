import { useAppDispatch } from "store/hooks";
import {
  deleteTask,
  activateTaskEditMode,
  changeTask,
} from "features/todo/todoSlice";

import * as S from "./styles";
import { Priority, Tag, TaskStatus } from "types/type";
import { getDateString } from "utils/helpers";

interface TaskItemProps {
  content: string;
  status: TaskStatus;
  id: string;
  tags?: Tag[];
  dueDate?: Date;
  priority: Priority;
}

const TaskItem = ({
  content,
  status,
  id,
  tags,
  dueDate,
  priority,
}: TaskItemProps) => {
  const dispatch = useAppDispatch();

  const handleDeleteTask = () => {
    dispatch(deleteTask(id));
  };

  const handleEditTask = () => {
    dispatch(activateTaskEditMode(id));
  };

  const handleToggleItemState = () => {
    const taskStatus = status === "active" ? "completed" : "active";
    dispatch(
      changeTask(id, {
        status: taskStatus,
      })
    );
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
          data-testid={`task-button-${id}`}
        >
          <S.Circle></S.Circle>
        </S.TaskButton>
        <S.TaskText $status={status}>{content}</S.TaskText>
        <S.EditButton
          onClick={handleEditTask}
          data-testid={`edit-button-${id}`}
        >
          <S.GreyEditIcon />
        </S.EditButton>
        <S.CrossButton
          onClick={handleDeleteTask}
          data-testid={`cross-button-${id}`}
        >
          <S.GreyCrossIcon />
        </S.CrossButton>
      </S.TaskItemContainer>
      {TaskDetails}
    </S.Task>
  );
};

export default TaskItem;
