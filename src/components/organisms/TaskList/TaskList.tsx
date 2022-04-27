import { Task } from "types/type";
import TaskItem from "../../molecules/TaskItem/TaskItem";
import { useAppSelector } from "store/hooks";
import {
  selectTaskArrayWithFilters,
  selectTaskEditModeId,
} from "features/todo/todoSlice";

import * as S from "./styles";
import TaskEdit from "components/molecules/TaskEdit/TaskEdit";

const TaskList = () => {
  const taskArray: Task[] = useAppSelector(selectTaskArrayWithFilters);
  const editModeId = useAppSelector(selectTaskEditModeId);

  function isEditModeActive(taskId: string): boolean {
    return taskId === editModeId;
  }

  return (
    <S.TaskSection>
      {taskArray.map((task) =>
        !isEditModeActive(task.taskId) ? (
          <TaskItem
            key={task.taskId}
            id={task.taskId}
            status={task.status}
            content={task.content}
          />
        ) : (
          <TaskEdit key={task.taskId} id={task.taskId} content={task.content} />
        )
      )}
    </S.TaskSection>
  );
};

export default TaskList;
