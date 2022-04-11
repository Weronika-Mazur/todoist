import { useAppDispatch, useAppSelector } from "store/hooks";
import { addTask, selectIsLoading } from "features/todo/todoSlice";
import { useState } from "react";

import "./TaskCreator.scss";
import PlusIcon from "assets/PlusIcon";
import BusyIcon from "assets/BusyIcon";
import { TaskContent } from "types/type";

function TaskCreator() {
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(selectIsLoading);
  const [text, setText] = useState("");

  async function handleAddItem() {
    try {
      if (text !== "") {
        const newTask: TaskContent = {
          content: text,
          state: "active",
        };

        const data = await dispatch(addTask(newTask));
        if (data) {
          setText("");
        }
      }
    } catch (err) {}
  }

  if (!isLoading) {
    return (
      <div className="task-creator">
        <button className="task-creator__plus-button" onClick={handleAddItem}>
          <div className="task-creator__circle">
            <PlusIcon className="task-creator__plus-icon" />
          </div>
        </button>
        <input
          type="text"
          className="task-creator__input"
          placeholder="Create a new todo..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
    );
  } else {
    return (
      <div className="busy">
        <BusyIcon className="busy-icon" />
      </div>
    );
  }
}

export default TaskCreator;
