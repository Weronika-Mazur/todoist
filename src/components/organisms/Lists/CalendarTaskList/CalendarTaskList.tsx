import { useAppSelector } from "store/hooks";
import { groupBy } from "lodash";
import { useMemo } from "react";

import {
  selectTaskEditModeId,
  selectTaskFilter,
} from "features/todo/todoSlice";

import TaskItem from "components/molecules/TaskItem/TaskItem";
import TaskEdit from "components/molecules/TaskEdit/TaskEdit";
import NoTasks from "components/molecules/NoTasks/NoTasks";

import * as S from "./styles";
import { Task } from "types/todo";
import { getDateString, getTodayString } from "utils/helpers";
import { useTodos } from "lib/todos";

const CalendarTaskList = () => {
  const taskArrayFilter = useAppSelector(selectTaskFilter);

  const filters = useMemo(() => ({ date: `ge${getTodayString()}` }), []);
  const { getArrayWithFilters } = useTodos({ filters });
  const arrayWithFilters = getArrayWithFilters(taskArrayFilter);

  const editModeId = useAppSelector(selectTaskEditModeId);

  function isEditModeActive(taskId: string): boolean {
    return taskId === editModeId;
  }

  const toDate = (date?: string) => (date ? new Date(date) : undefined);

  const formatDate = (task: Task) => getDateString(new Date(task.dueDate!));

  const groupedTasks = groupBy(arrayWithFilters, formatDate);

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
                  status={task.status}
                  taskId={task.taskId}
                  content={task.content}
                  tags={task.tags}
                  priority={task.priority}
                  dueDate={toDate(task.dueDate)}
                  listId={task.listId}
                  filters={filters}
                />
              ) : (
                <TaskEdit
                  key={task.taskId}
                  taskId={task.taskId}
                  content={task.content}
                  dueDate={toDate(task.dueDate)}
                  tags={task.tags}
                  priority={task.priority}
                  listId={task.listId}
                  filters={filters}
                />
              )
            )}
          </S.TaskSection>
        </div>
      ))}
    </section>
  ) : (
    <NoTasks />
  );
};

export default CalendarTaskList;
