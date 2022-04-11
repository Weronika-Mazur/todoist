import { useState } from "react";

import { useAppDispatch } from "store/hooks";
import {
  deactivateEditMode,
  changeTask,
  setIsLoading,
  setErrorMessage,
} from "features/todo/todoSlice";

import CrossIcon from "assets/CrossIcon";
import "./TaskEdit.scss";

interface TaskEditProps {
  content: string;
  id: string;
}

function TaskEdit({ content, id }: TaskEditProps) {
  const dispatch = useAppDispatch();
  const [text, setText] = useState(content);

  function handleEndEditing() {
    dispatch(
      changeTask({
        _id: id,
        content: text,
      })
    )
      .then(() => {
        dispatch(deactivateEditMode());
      })
      .catch((err) => {
        dispatch(setIsLoading(false));
        dispatch(setErrorMessage("editing task"));
      });
  }

  function handleCancelEdit() {
    dispatch(deactivateEditMode());
  }

  return (
    <>
      <div className="backdrop" onClick={handleEndEditing}></div>
      <div className="edit">
        <input
          type="text"
          className="edit__input task-creator__input"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="edit__cross-btn" onClick={handleCancelEdit}>
          <CrossIcon className="edit__cross-btn--white" />
        </button>
      </div>
    </>
  );
}

export default TaskEdit;
