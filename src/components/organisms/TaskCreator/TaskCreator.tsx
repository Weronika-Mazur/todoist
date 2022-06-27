import { useState } from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";

import { addTask } from "features/todo/todoSlice";
import { selectIsLoading } from "features/todo/todoSlice";

import BusyIcon from "assets/BusyIcon";
import TaskInput from "./TaskInput";
import TaskDetails from "components/molecules/TaskDetails/TaskDetails";

import * as S from "./styles";
import { NewTask, Priority, Tag } from "types/type";
import { toDate } from "utils/helpers";

const TaskCreator = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);

  const [newTask, setNewTask] = useState({
    content: "",
    status: "active",
    priority: Priority.P1,
    dueDate: undefined,
    tags: [],
  } as NewTask);

  const handleAddTask = async () => {
    if (newTask.content !== "") {
      const data = await dispatch(addTask(newTask));
      if (data) {
        setNewTask({
          content: "",
          status: "active",
          priority: Priority.P1,
          dueDate: undefined,
          tags: [],
        });
      }
    }
  };

  const handleSetDate = (newDate?: Date) => {
    setNewTask({ ...newTask, dueDate: newDate?.toLocaleDateString("en-CA") });
  };

  const handleSetPriority = (priority = Priority.P1) => {
    setNewTask({ ...newTask, priority });
  };

  const handleSetTaskTags = (newSet: Tag[]) => {
    setNewTask({ ...newTask, tags: newSet });
  };

  const handleSetContent = (text: string) => {
    setNewTask({ ...newTask, content: text });
  };

  return !isLoading ? (
    <>
      <TaskInput
        content={newTask.content}
        handleAddTask={handleAddTask}
        handleSetContent={handleSetContent}
      />

      <TaskDetails
        date={toDate(newTask.dueDate)}
        handleSetDate={handleSetDate}
        priority={newTask.priority}
        handleSetPriority={handleSetPriority}
        taskTags={newTask.tags}
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
