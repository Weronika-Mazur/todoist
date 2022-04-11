import TaskFilters from "../TaskFilters/TaskFilters";
import TaskList from "../TaskList/TaskList";
import TaskCreator from "../TaskCreator/TaskCreator";

const TaskContainer = () => {
  return (
    <main>
      <TaskCreator />
      <TaskList />
      <TaskFilters />
    </main>
  );
};

export default TaskContainer;
