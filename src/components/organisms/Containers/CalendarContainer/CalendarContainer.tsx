import { useLayoutEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";

import { fetchTaskArray, selectIsLoading } from "features/todo/todoSlice";

import TaskFilterBar from "../../TaskFilters/TaskFilterBar";
import CalendarTaskList from "../../Lists/CalendarTaskList/CalendarTaskList";

import { getTodayString } from "utils/helpers";

const CalendarContainer = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);

  const filters = useMemo(() => ({ date: `ge${getTodayString()}` }), []);

  useLayoutEffect(() => {
    dispatch(fetchTaskArray(filters));
  }, [dispatch, filters]);

  return (
    <main className="w-full mr-[0px]">
      <TaskFilterBar filters={filters} />
      {!isLoading && <CalendarTaskList />}
    </main>
  );
};

export default CalendarContainer;
