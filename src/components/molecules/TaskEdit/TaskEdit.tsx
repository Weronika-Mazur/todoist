import { useState } from "react";
import { useAppDispatch } from "store/hooks";

import { deactivateTaskEditMode, editTask } from "features/todo/todoSlice";
import { Priority, Tag } from "types/type";

import * as S from "./styles";
import TaskDetails from "../TaskDetails/TaskDetails";
import CancelButton from "components/atoms/CancelButton/CancelButton";
import Button from "components/atoms/Button/Button";

interface TaskEditProps {
  content: string;
  id: string;
  tags?: Tag[];
  dueDate?: Date;
  priority: Priority;
}

const TaskEdit = ({ content, id, tags, dueDate, priority }: TaskEditProps) => {
  const dispatch = useAppDispatch();
  const [text, setText] = useState(content);
  const [date, setDate] = useState<Date | undefined>(dueDate ?? undefined);
  const [taskTags, setTaskTags] = useState<Tag[]>(tags ?? []);
  const [newPriority, setNewPriority] = useState<Priority>(priority);

  const handleEndEditing = async () => {
    const data = await dispatch(
      editTask(id, {
        content: text,
        priority: newPriority,
        dueDate: date?.toLocaleDateString("en-CA"),
        tags: taskTags,
      })
    );
    if (data) {
      dispatch(deactivateTaskEditMode());
    }
  };

  const handleCancelEdit = () => {
    dispatch(deactivateTaskEditMode());
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setText(e.target.value);

  const handleSetDate = (newDate?: Date) => {
    setDate(newDate);
  };

  const handleSetPriority = (priority = Priority.p1) => {
    setNewPriority(priority);
  };

  const handleSetTaskTags = (newSet: Tag[]) => {
    setTaskTags(newSet);
  };

  return (
    <>
      <S.EditContainer>
        <S.InputContainer>
          <S.EditInput
            type="text"
            value={text}
            maxLength={200}
            onChange={handleTextChange}
            autoFocus
          />
        </S.InputContainer>
        <TaskDetails
          date={date}
          handleSetDate={handleSetDate}
          priority={newPriority}
          handleSetPriority={handleSetPriority}
          taskTags={taskTags}
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
