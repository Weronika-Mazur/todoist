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

const TaskList = () => {
  const taskArray: Task[] = useAppSelector(selectTaskArrayWithFilters);
  const isLoading = useAppSelector(selectIsLoading);
  const editModeId = useAppSelector(selectTaskEditModeId);

  function isEditModeActive(taskId: string): boolean {
    return taskId === editModeId;
  }

  const toDate = (date?: string) => (date ? new Date(date) : undefined);

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
  ) : !isLoading ? (
    <S.EmptyIllustrationContainer>
      <S.EmptyIllustration />
      <S.NotFoundText>No tasks found</S.NotFoundText>
    </S.EmptyIllustrationContainer>
  ) : null;
};

export default TaskList;
