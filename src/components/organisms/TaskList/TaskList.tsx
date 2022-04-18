import { Task } from "types/type";
import TaskItem from "../../molecules/TaskItem/TaskItem";
import { useAppSelector } from "store/hooks";
import {
  selectTaskArrayWithFilters,
  selectEditModeId,
} from "features/todo/todoSlice";

import TaskEdit from "components/molecules/TaskEdit/TaskEdit";

const TaskList = () => {
  const taskArray: Task[] = useAppSelector(selectTaskArrayWithFilters);
  const editModeId = useAppSelector(selectEditModeId);

  function isEditModeActive(taskId: string): boolean {
    return taskId === editModeId;
  }

  return (
    <section className="flex flex-col mt-6 bg-main-700 rounded-md">
      {taskArray.map((task) =>
        !isEditModeActive(task.taskId) ? (
          <TaskItem
            key={task.taskId}
            id={task.taskId}
            state={task.state}
            content={task.content}
          />
        ) : (
          <TaskEdit key={task.taskId} id={task.taskId} content={task.content} />
        )
      )}
    </section>
  );
};

export default TaskList;
