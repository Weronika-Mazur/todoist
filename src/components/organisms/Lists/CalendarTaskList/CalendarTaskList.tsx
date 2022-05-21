import { Task } from "types/type";
import TaskItem from "../../../molecules/TaskItem/TaskItem";
import { useAppSelector } from "store/hooks";
import {
  selectIsLoading,
  selectTaskArrayWithFilters,
  selectTaskEditModeId,
} from "features/todo/todoSlice";

import * as S from "./styles";
import TaskEdit from "components/molecules/TaskEdit/TaskEdit";

import _ from "lodash";

const CalendarTaskList = () => {
  const taskArray: Task[] = useAppSelector(selectTaskArrayWithFilters);
  const isLoading = useAppSelector(selectIsLoading);

  const editModeId = useAppSelector(selectTaskEditModeId);

  function isEditModeActive(taskId: string): boolean {
    return taskId === editModeId;
  }

  const toDate = (date?: string) => (date ? new Date(date) : undefined);

  const formatDate = (task: Task) =>
    new Date(task.dueDate!).toLocaleDateString("en-GB", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const groupedTasks = _.groupBy(taskArray, formatDate);

  return Object.entries(groupedTasks).length !== 0 ? (
    <section>
      {Object.entries(groupedTasks).map(([date, tasks]) => (
        <div key={date}>
          <S.DateHeader>{date}</S.DateHeader>
          <S.TaskSection>
            {tasks.map((task) =>
              !isEditModeActive(task.taskId) ? (
                <TaskItem
                  key={task.taskId}
                  id={task.taskId}
                  status={task.status}
                  content={task.content}
                  dueDate={toDate(task.dueDate)}
                  tags={task.tags}
                  priority={task.priority}
                />
              ) : (
                <TaskEdit
                  key={task.taskId}
                  id={task.taskId}
                  content={task.content}
                  dueDate={toDate(task.dueDate)}
                  tags={task.tags}
                  priority={task.priority}
                />
              )
            )}
          </S.TaskSection>
        </div>
      ))}
    </section>
  ) : !isLoading ? (
    <S.EmptyIllustrationContainer>
      <S.EmptyIllustration />
      <S.NotFoundText>No tasks found</S.NotFoundText>
    </S.EmptyIllustrationContainer>
  ) : null;
};

export default CalendarTaskList;
