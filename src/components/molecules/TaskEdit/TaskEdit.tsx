import { useState } from "react";

import { useAppDispatch } from "store/hooks";
import {
  deactivateEditMode,
  changeTask,
  setIsLoading,
  setErrorMessage,
} from "features/todo/todoSlice";

import CrossIcon from "assets/CrossIcon";
import { Backdrop, EditContainer, EditInput } from "./styles";

interface TaskEditProps {
  content: string;
  id: string;
}

const TaskEdit = ({ content, id }: TaskEditProps) => {
  const dispatch = useAppDispatch();
  const [text, setText] = useState(content);

  function handleEndEditing() {
    dispatch(
      changeTask(id, {
        content: text,
      })
    )
      .then(() => {
        dispatch(deactivateEditMode());
      })
      .catch(() => {
        dispatch(setIsLoading(false));
        dispatch(setErrorMessage("editing task"));
      });
  }

  const handleCancelEdit = () => dispatch(deactivateEditMode());

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setText(e.target.value);

  return (
    <>
      <Backdrop onClick={handleEndEditing}></Backdrop>
      <EditContainer>
        <EditInput
          type="text"
          value={text}
          maxLength={200}
          onChange={handleTextChange}
        />
        <button onClick={handleCancelEdit}>
          <CrossIcon className="fill-main-300" />
        </button>
      </EditContainer>
    </>
  );
};

export default TaskEdit;
