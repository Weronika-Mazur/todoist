import { useAppDispatch, useAppSelector } from "store/hooks";
import { addTask, selectIsLoading } from "features/todo/todoSlice";
import { useState } from "react";

import BusyIcon from "assets/BusyIcon";
import { TaskContent } from "types/type";
import Button from "components/atoms/Button/Button";
import {
  BusyAnimation,
  TaskCreatorContainer,
  TaskCreatorInput,
} from "./styles";

const TaskCreator = () => {
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

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setText(e.target.value);

  if (!isLoading) {
    return (
      <TaskCreatorContainer>
        <Button onClick={handleAddItem} text="add"></Button>
        <TaskCreatorInput
          type="text"
          placeholder="Create a new todo..."
          maxLength={200}
          value={text}
          onChange={handleTextChange}
        />
      </TaskCreatorContainer>
    );
  } else {
    return (
      <BusyAnimation>
        <BusyIcon className="busy-icon" />
      </BusyAnimation>
    );
  }
};

export default TaskCreator;
