import TaskFilters from "../../TaskFilters/TaskFilters";
import TaskList from "../../Lists/TaskList/TaskList";

const FilteredContainer = () => {
  return (
    <main className="w-full mr-[0px]">
      <TaskFilters />
      <TaskList />
    </main>
  );
};

export default FilteredContainer;
