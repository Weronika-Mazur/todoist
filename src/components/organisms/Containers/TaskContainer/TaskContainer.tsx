import TaskFilters from "../../TaskFilters/TaskFilters";
import TaskList from "../../Lists/TaskList/TaskList";
import TaskCreator from "../../TaskCreator/TaskCreator";

const TaskContainer = () => {
  return (
    <main className="w-full mr-[0px]">
      <TaskCreator />
      <TaskFilters />
      <TaskList />
    </main>
  );
};

export default TaskContainer;
