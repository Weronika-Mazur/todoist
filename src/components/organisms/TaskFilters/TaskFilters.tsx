import { useAppDispatch, useAppSelector } from "store/hooks";
import {
  setFilter,
  clearCompleted,
  selectItemsCounter,
  selectTaskFilter,
} from "features/todo/todoSlice";

import { FilterArray, Filter } from "types/type";
import { ClearCompleted, FilterBar, FilterOption, FilterList } from "./styles";

const TaskFilters = () => {
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
    dispatch(clearCompleted());
  }

  return (
    <FilterBar>
      <p>{itemsLeft}</p>
      <FilterList>
        {filterArray.map((filter) => (
          <FilterOption
            key={filter.type}
            onClick={() => {
              handleSetFilter(filter.type);
            }}
            $selected={isActiveFilter(filter.type)}
          >
            {filter.desc}
          </FilterOption>
        ))}
      </FilterList>
      <ClearCompleted onClick={handleClearCompleted}>
        Clear completed
      </ClearCompleted>
    </FilterBar>
  );
};

export default TaskFilters;
