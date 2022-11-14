import { useMemo } from "react";

import TaskFilterBar from "../../TaskFilters/TaskFilterBar";
import CalendarTaskList from "../../Lists/CalendarTaskList/CalendarTaskList";

import { getTodayString } from "utils/helpers";
import { useTodos } from "lib/todos";

const CalendarContainer = () => {
  const filters = useMemo(() => ({ date: `ge${getTodayString()}` }), []);

  const { isLoading } = useTodos({ filters });

  return (
    <main className="w-full mr-[0px]">
      <TaskFilterBar filters={filters} />
      {!isLoading && <CalendarTaskList />}
    </main>
  );
};

export default CalendarContainer;
