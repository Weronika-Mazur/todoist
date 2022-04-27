import { useState } from "react";
import { useAppDispatch } from "store/hooks";
import { addTask } from "features/todo/todoSlice";

import { TaskContent } from "types/type";

import Button from "components/atoms/Button/Button";
import * as S from "./styles";

const TaskCreatorContainer = () => {
  const dispatch = useAppDispatch();

  const [text, setText] = useState("");

  async function handleAddItem() {
    if (text !== "") {
      const newTask: TaskContent = {
        content: text,
        status: "active",
      };

      const data = await dispatch(addTask(newTask));
      if (data) {
        setText("");
      }
    }
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setText(e.target.value);

  return (
    <S.TaskCreatorContainer>
      <Button onClick={handleAddItem} text="add"></Button>
      <S.TaskCreatorInput
        type="text"
        placeholder="Create a new todo..."
        maxLength={200}
        value={text}
        onChange={handleTextChange}
      />
    </S.TaskCreatorContainer>
  );
};

export default TaskCreatorContainer;
