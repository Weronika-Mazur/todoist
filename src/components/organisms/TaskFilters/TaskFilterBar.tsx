import { useAppDispatch, useAppSelector } from "store/hooks";
import {
  setFilter,
  clearCompleted,
  selectItemsCounter,
  selectTaskFilter,
} from "features/todo/todoSlice";

import { FilterArray, Filter, TaskFilters } from "types/type";
import * as S from "./styles";

interface TaskFilterBarProps {
  filters?: TaskFilters;
}

const TaskFilterBar = ({ filters = {} }: TaskFilterBarProps) => {
  const dispatch = useAppDispatch();
  const itemsLeft = `${useAppSelector(selectItemsCounter)} items left`;
  const taskFilter = useAppSelector(selectTaskFilter);

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
    return taskFilter === filterType;
  }

  function handleSetFilter(filterType: Filter) {
    dispatch(setFilter(filterType));
  }

  function handleClearCompleted() {
    dispatch(clearCompleted(filters));
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
