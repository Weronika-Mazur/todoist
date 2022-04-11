import classNames from "classnames";

import { useAppDispatch } from "store/hooks";
import {
  deleteTask,
  activateEditMode,
  changeTask,
} from "features/todo/todoSlice";

import CheckIcon from "assets/CheckIcon";
import CrossIcon from "assets/CrossIcon";
import EditIcon from "assets/EditIcon";
import "./TaskItem.scss";

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
      changeTask({
        _id: id,
        state: taskStatus,
      })
    );
  }

  return (
    <div
      className={classNames("item", {
        "item--task-completed": state === `completed`,
      })}
    >
      <button
        className={classNames("item__check-button", {
          checked: state === "completed",
        })}
        onClick={handleToggleItemState}
      >
        <div className="item__circle">
          <CheckIcon className="item__check-icon" />
        </div>
      </button>
      <p className="item__text">{content}</p>
      <button className="item__edit-button" onClick={handleEditTask}>
        <EditIcon />
      </button>
      <button className="item__cross-button" onClick={handleDeleteTask}>
        <CrossIcon />
      </button>
    </div>
  );
}

export default TaskItem;
