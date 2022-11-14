import { useAppDispatch, useAppSelector } from "store/hooks";
import { setFilter, selectTaskFilter } from "features/todo/todoSlice";

import { TaskFilters } from "types/todo";
import { FilterArray, Filter } from "types/type";

import * as S from "./styles";
import { useClearCompleted, useTodos } from "lib/todos";

interface TaskFilterBarProps {
  filters?: TaskFilters;
}

const TaskFilterBar = ({ filters = {} }: TaskFilterBarProps) => {
  const dispatch = useAppDispatch();
  const { activeItemsCounter } = useTodos({ filters });

  const itemsLeft = `${activeItemsCounter ?? 0} items left`;
  const taskArrayFilter = useAppSelector(selectTaskFilter);
  const { clearCompleted } = useClearCompleted();

  const filterArray: FilterArray[] = [
    {
      type: "all",
      desc: "All",
    },
    {
      type: "active",
      desc: "Active",
    },
    {
      type: "completed",
      desc: "Completed",
    },
  ];

  function isActiveFilter(filterType: Filter): boolean {
    return taskArrayFilter === filterType;
  }

  function handleSetFilter(filterType: Filter) {
    dispatch(setFilter(filterType));
  }

  function handleClearCompleted() {
    clearCompleted(filters);
  }

  return (
    <S.FilterBar>
      <S.TasksLeftCounter>{itemsLeft}</S.TasksLeftCounter>
      <S.FilterList>
        {filterArray.map(({ type, desc }) => (
          <S.FilterOption
            key={type}
            onClick={() => {
              handleSetFilter(type);
            }}
            $selected={isActiveFilter(type)}
          >
            {desc}
          </S.FilterOption>
        ))}
      </S.FilterList>
      <S.ClearCompleted onClick={handleClearCompleted}>
        Clear completed
      </S.ClearCompleted>
    </S.FilterBar>
  );
};

export default TaskFilterBar;
