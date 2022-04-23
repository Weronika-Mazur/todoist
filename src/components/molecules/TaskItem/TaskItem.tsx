import { useAppDispatch } from "store/hooks";
import {
  deleteTask,
  activateTaskEditMode,
  changeTask,
} from "features/todo/todoSlice";

import CrossIcon from "assets/CrossIcon";
import EditIcon from "assets/EditIcon";

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
      <button className="edit-button invisible" onClick={handleEditTask}>
        <EditIcon className="fill-main-300" />
      </button>
      <button className="cross-button invisible" onClick={handleDeleteTask}>
        <CrossIcon className="fill-main-300" />
      </button>
    </S.TaskItemContainer>
  );
};

export default TaskItem;
