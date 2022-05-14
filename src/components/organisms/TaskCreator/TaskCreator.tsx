import { useState } from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { addTask } from "features/todo/todoSlice";

import { selectIsLoading } from "features/todo/todoSlice";

import { TaskContent } from "types/type";
import { Priority, Tag } from "types/type";
import * as S from "./styles";

import BusyIcon from "assets/BusyIcon";
import TaskInput from "./TaskInput";
import TaskDetails from "components/molecules/TaskDetails/TaskDetails";

const TaskCreator = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);

  const [content, setContent] = useState("");
  const [date, setDate] = useState<Date>();
  const [taskTags, setTaskTags] = useState<Tag[]>([]);
  const [priority, setPriority] = useState<Priority>(Priority.p1);

  async function handleAddTask() {
    if (content !== "") {
      const newTask: TaskContent = {
        content: content,
        status: "active",
        priority: priority,
        dueDate: date,
        tags: taskTags,
      };

      const data = await dispatch(addTask(newTask));
      if (data) {
        setContent("");
        setDate(undefined);
        setTaskTags([]);
        setPriority(Priority.p1);
      }
    }
  }

  const handleSetDate = (newDate?: Date) => {
    setDate(newDate);
  };

  const handleSetPriority = (priority = Priority.p1) => {
    setPriority(priority);
  };

  const handleSetTaskTags = (newSet: Tag[]) => {
    setTaskTags(newSet);
  };

  const handleSetContent = (text: string) => {
    setContent(text);
  };

  return !isLoading ? (
    <>
      <TaskInput
        content={content}
        handleAddTask={handleAddTask}
        handleSetContent={handleSetContent}
      />

      <TaskDetails
        date={date}
        handleSetDate={handleSetDate}
        priority={priority}
        handleSetPriority={handleSetPriority}
        taskTags={taskTags}
        handleSetTaskTags={handleSetTaskTags}
      />
    </>
  ) : (
    <S.BusyAnimation>
      <BusyIcon />
    </S.BusyAnimation>
  );
};

export default TaskCreator;
