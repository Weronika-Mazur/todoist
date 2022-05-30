import { useState } from "react";
import { useAppDispatch } from "store/hooks";

import { deactivateTaskEditMode, editTask } from "features/todo/todoSlice";
import { NewTask, Priority, Tag } from "types/type";

import * as S from "./styles";
import TaskDetails from "../TaskDetails/TaskDetails";
import CancelButton from "components/atoms/CancelButton/CancelButton";
import Button from "components/atoms/Button/Button";
import { toDate } from "utils/helpers";

interface TaskEditProps {
  content: string;
  id: string;
  tags?: Tag[];
  dueDate?: Date;
  priority: Priority;
}

const TaskEdit = ({ content, id, tags, dueDate, priority }: TaskEditProps) => {
  const dispatch = useAppDispatch();

  const [newTask, setNewTask] = useState({
    content: content,
    priority: priority,
    dueDate: dueDate,
    tags: tags ?? [],
  } as NewTask);

  const handleEndEditing = async () => {
    const data = await dispatch(editTask(id, newTask));
    if (data) {
      dispatch(deactivateTaskEditMode());
    }
  };

  const handleCancelEdit = () => {
    dispatch(deactivateTaskEditMode());
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask({ ...newTask, content: e.target.value });
  };

  const handleSetDate = (newDate?: Date) => {
    setNewTask({ ...newTask, dueDate: newDate?.toLocaleDateString("en-CA") });
  };

  const handleSetPriority = (priority = Priority.p1) => {
    setNewTask({ ...newTask, priority });
  };

  const handleSetTaskTags = (newSet: Tag[]) => {
    setNewTask({ ...newTask, tags: newSet });
  };

  return (
    <>
      <S.EditContainer>
        <S.InputContainer>
          <S.EditInput
            type="text"
            value={newTask.content}
            maxLength={200}
            onChange={handleTextChange}
            autoFocus
          />
        </S.InputContainer>
        <TaskDetails
          date={toDate(newTask.dueDate)}
          handleSetDate={handleSetDate}
          priority={newTask.priority}
          handleSetPriority={handleSetPriority}
          taskTags={newTask.tags}
          handleSetTaskTags={handleSetTaskTags}
        />
        <S.ButtonContainer>
          <Button text="confirm" onClick={handleEndEditing} />
          <CancelButton onClick={handleCancelEdit} />
        </S.ButtonContainer>
      </S.EditContainer>
    </>
  );
};

export default TaskEdit;
