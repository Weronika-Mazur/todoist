import { useAppSelector } from "store/hooks";

import {
  selectTaskArrayWithFilters,
  selectTaskEditModeId,
} from "features/todo/todoSlice";

import TaskItem from "components/molecules/TaskItem/TaskItem";
import NoTasks from "components/molecules/NoTasks/NoTasks";
import TaskEdit from "components/molecules/TaskEdit/TaskEdit";

import * as S from "./styles";
import { toDate } from "utils/helpers";

const TaskList = () => {
  const taskArray = useAppSelector(selectTaskArrayWithFilters);
  const editModeId = useAppSelector(selectTaskEditModeId);

  function isEditModeActive(taskId: string): boolean {
    return taskId === editModeId;
  }

  return taskArray.length !== 0 ? (
    <S.TaskSection>
      {taskArray.map((task) =>
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
  ) : (
    <NoTasks />
  );
};

export default TaskList;
