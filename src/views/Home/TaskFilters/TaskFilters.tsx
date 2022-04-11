import { useAppDispatch, useAppSelector } from "store/hooks";
import classNames from "classnames";
import {
  setFilter,
  clearCompleted,
  selectItemsCounter,
  selectTaskFilter,
} from "features/todo/todoSlice";

import { FilterArray, Filter } from "types/type";
import "./TaskFilters.scss";

function TaskFilters() {
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
    <section className="filter-bar">
      <p>{itemsLeft}</p>
      <ul className="filter-bar__filter">
        {filterArray.map((filter) => (
          <li
            key={filter.type}
            onClick={() => {
              handleSetFilter(filter.type);
            }}
            className={classNames("filter-bar__option", {
              "filter-bar__option--active": isActiveFilter(filter.type),
            })}
          >
            {filter.desc}
          </li>
        ))}
      </ul>
      <p onClick={handleClearCompleted} className="filter-bar__clear-completed">
        Clear Completed
      </p>
    </section>
  );
}

export default TaskFilters;
