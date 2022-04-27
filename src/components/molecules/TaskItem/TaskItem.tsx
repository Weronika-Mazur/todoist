import { useAppDispatch } from "store/hooks";
import {
  deleteTask,
  activateTaskEditMode,
  changeTask,
} from "features/todo/todoSlice";

import * as S from "./styles";
import { TaskStatus } from "types/type";

interface TaskItemProps {
  content: string;
  status: TaskStatus;
  id: string;
}

const TaskItem = ({ content, status, id }: TaskItemProps) => {
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

  return (
    <S.TaskItemContainer>
      <S.TaskButton $status={status} onClick={handleToggleItemState}>
        <S.Circle></S.Circle>
      </S.TaskButton>
      <S.TaskText $status={status}>{content}</S.TaskText>
      <S.EditButton onClick={handleEditTask}>
        <S.GreyEditIcon />
      </S.EditButton>
      <S.CrossButton onClick={handleDeleteTask}>
        <S.GreyCrossIcon />
      </S.CrossButton>
    </S.TaskItemContainer>
  );
};

export default TaskItem;
