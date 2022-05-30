import { useAppSelector } from "store/hooks";
import { groupBy } from "lodash";

import {
  selectIsLoading,
  selectTaskArrayWithFilters,
  selectTaskEditModeId,
} from "features/todo/todoSlice";

import TaskItem from "components/molecules/TaskItem/TaskItem";
import TaskEdit from "components/molecules/TaskEdit/TaskEdit";
import NoTasks from "components/molecules/NoTasks/NoTasks";

import * as S from "./styles";
import { Task } from "types/type";
import { getDateString } from "utils/helpers";

const CalendarTaskList = () => {
  const taskArray: Task[] = useAppSelector(selectTaskArrayWithFilters);
  const isLoading = useAppSelector(selectIsLoading);

  const editModeId = useAppSelector(selectTaskEditModeId);

  function isEditModeActive(taskId: string): boolean {
    return taskId === editModeId;
  }

  const toDate = (date?: string) => (date ? new Date(date) : undefined);

  const formatDate = (task: Task) => getDateString(new Date(task.dueDate!));

  const groupedTasks = groupBy(taskArray, formatDate);

  const groupedTasksEntries = Object.entries(groupedTasks);

  return groupedTasksEntries.length !== 0 ? (
    <section>
      {groupedTasksEntries.map(([date, tasks]) => (
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
  ) : (
    <NoTasks isLoading={isLoading} />
  );
};

export default CalendarTaskList;
