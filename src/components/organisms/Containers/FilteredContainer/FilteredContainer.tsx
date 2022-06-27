import { useLayoutEffect, useMemo } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store/hooks";

import { fetchTaskArray, selectIsLoading } from "features/todo/todoSlice";

import TaskFilterBar from "../../TaskFilters/TaskFilterBar";
import TaskList from "../../Lists/TaskList/TaskList";

import { TaskFilters } from "types/type";

interface FilteredContainerProps {
  filters?: TaskFilters;
}

const FilteredContainer = ({ filters }: FilteredContainerProps) => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const [searchParams] = useSearchParams();
  const isLoading = useAppSelector(selectIsLoading);

  const listId = params.listId;
  const tag = searchParams.get("tag");
  const priority = searchParams.get("priority");
  const date = searchParams.get("date");

  const paramsFilter = useMemo(() => {
    return {
      ...(listId && { listId }),
      ...(tag && { tag }),
      ...(priority && { priority }),
      ...(date && { date }),
    };
  }, [listId, tag, priority, date]);

  const taskFilters = filters ?? paramsFilter;

  useLayoutEffect(() => {
    dispatch(fetchTaskArray(taskFilters));
  }, [dispatch, taskFilters]);

  return (
    <main className="w-full mr-[0px]">
      <TaskFilterBar filters={taskFilters} />
      {!isLoading && <TaskList />}
    </main>
  );
};

export default FilteredContainer;
