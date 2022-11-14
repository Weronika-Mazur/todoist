import { useState } from "react";

import BusyIcon from "assets/BusyIcon";
import TaskInput from "./TaskInput";
import TaskDetails from "components/molecules/TaskDetails/TaskDetails";

import * as S from "./styles";
import { NewTask, Priority } from "types/todo";
import { Tag } from "types/tag";
import { toDate } from "utils/helpers";
import { useAddTodo } from "lib/todos";
import { useGetListId } from "utils/useGetListId";

const TaskCreator = ({ isLoading }: { isLoading: boolean }) => {
  const { addTask } = useAddTodo();
  const listId = useGetListId();

  const [newTask, setNewTask] = useState({
    content: "",
    status: "active",
    priority: Priority.P1,
    dueDate: undefined,
    tags: [],
  } as NewTask);

  const handleAddTask = async () => {
    if (newTask.content !== "") {
      addTask(
        { newTask, listId },
        {
          onSuccess: () => {
            setNewTask({
              content: "",
              status: "active",
              priority: Priority.P1,
              dueDate: undefined,
              tags: [],
            });
          },
        }
      );
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
