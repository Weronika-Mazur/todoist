import { useMemo } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import TaskFilterBar from "../../TaskFilters/TaskFilterBar";
import TaskList from "../../Lists/TaskList/TaskList";

import { TaskFilters } from "types/todo";
import { useTodos } from "lib/todos";

interface FilteredContainerProps {
  filters?: TaskFilters;
}

const FilteredContainer = ({ filters }: FilteredContainerProps) => {
  const params = useParams();
  const [searchParams] = useSearchParams();

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

  const { isLoading } = useTodos({ filters: taskFilters });

  return (
    <main className="w-full mr-[0px]">
      <TaskFilterBar filters={taskFilters} />
      {!isLoading && <TaskList filters={taskFilters} />}
    </main>
  );
};

export default FilteredContainer;
