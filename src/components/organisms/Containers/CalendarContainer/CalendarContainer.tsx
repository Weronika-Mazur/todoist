import TaskFilters from "../../TaskFilters/TaskFilters";
import CalendarTaskList from "../../Lists/CalendarTaskList/CalendarTaskList";

const CalendarContainer = () => {
  return (
    <main className="w-full mr-[0px]">
      <TaskFilters />
      <CalendarTaskList />
    </main>
  );
};

export default CalendarContainer;
