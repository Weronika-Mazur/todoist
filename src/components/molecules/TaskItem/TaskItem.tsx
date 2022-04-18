import { useAppDispatch } from "store/hooks";
import {
  deleteTask,
  activateEditMode,
  changeTask,
} from "features/todo/todoSlice";

import CrossIcon from "assets/CrossIcon";
import EditIcon from "assets/EditIcon";
import { Circle, TaskItemContainer, TaskText, TaskButton } from "./styles";

interface TaskItemProps {
  content: string;
  state: "completed" | "active";
  id: string;
}

function TaskItem({ content, state, id }: TaskItemProps) {
  const dispatch = useAppDispatch();

  function handleDeleteTask() {
    dispatch(deleteTask(id));
  }

  function handleEditTask() {
    dispatch(activateEditMode(id));
  }

  function handleToggleItemState() {
    const taskStatus = state === "active" ? "completed" : "active";
    dispatch(
      changeTask(id, {
        state: taskStatus,
      })
    );
  }

  return (
    <TaskItemContainer>
      <TaskButton $state={state} onClick={handleToggleItemState}>
        <Circle></Circle>
      </TaskButton>
      <TaskText $state={state}>{content}</TaskText>
      <button className="edit-button invisible" onClick={handleEditTask}>
        <EditIcon className="fill-main-300" />
      </button>
      <button className="cross-button invisible" onClick={handleDeleteTask}>
        <CrossIcon className="fill-main-300" />
      </button>
    </TaskItemContainer>
  );
}

export default TaskItem;
