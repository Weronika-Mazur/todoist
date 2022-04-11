import { Task } from "types/type";
import TaskItem from "../TaskItem/TaskItem";
import { useAppSelector } from "store/hooks";
import {
  selectTaskArrayWithFilters,
  selectEditModeId,
} from "features/todo/todoSlice";
import "./TaskList.scss";
import TaskEdit from "../TaskEdit/TaskEdit";

function TaskList() {
  const taskArray: Task[] = useAppSelector(selectTaskArrayWithFilters);
  const editModeId = useAppSelector(selectEditModeId);

  function isEditModeActive(taskId: string): boolean {
    return taskId === editModeId;
  }

  return (
    <section className="task-list">
      {taskArray.map((task) =>
        !isEditModeActive(task._id) ? (
          <TaskItem
            key={task._id}
            id={task._id}
            state={task.state}
            content={task.content}
          />
        ) : (
          <TaskEdit key={task._id} id={task._id} content={task.content} />
        )
      )}
    </section>
  );
}

export default TaskList;
