import { useAppSelector } from "store/hooks";

import NoTasks from "components/molecules/NoTasks/NoTasks";
import TaskItem from "components/molecules/TaskItem/TaskItem";
import TaskEdit from "components/molecules/TaskEdit/TaskEdit";

import {
  selectTaskEditModeId,
  selectTaskFilter,
} from "features/todo/todoSlice";

import * as S from "./styles";
import { toDate } from "utils/helpers";
import { TaskFilters } from "types/todo";
import { useTodos } from "lib/todos";

interface TaskListProps {
  filters: TaskFilters;
  enabled?: boolean;
}

const TaskList = ({ filters, enabled = true }: TaskListProps) => {
  const taskArrayFilter = useAppSelector(selectTaskFilter);
  const editModeId = useAppSelector(selectTaskEditModeId);

  function isEditModeActive(taskId: string): boolean {
    return taskId === editModeId;
  }

  const { getArrayWithFilters } = useTodos({ filters, enabled });
  const arrayWithFilters = getArrayWithFilters(taskArrayFilter);

  if (!arrayWithFilters) return null;

  if (arrayWithFilters.length === 0) return <NoTasks />;

  return (
    <S.TaskSection>
      {arrayWithFilters.map((task) =>
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
  );
};

export default TaskList;
