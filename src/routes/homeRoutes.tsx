import { getTodayString, getTomorrowString } from "utils/helpers";

import FilteredContainer from "components/organisms/Containers/FilteredContainer/FilteredContainer";
import TaskContainer from "components/organisms/Containers/TaskContainer/TaskContainer";
import Home from "views/Home/Home";
import CalendarContainer from "components/organisms/Containers/CalendarContainer/CalendarContainer";
import TagsContainer from "components/organisms/Containers/TagsContainer/TagsContainer";

const tomorrowFilters = {
  date: getTomorrowString(),
};

const todayFilters = {
  date: getTodayString(),
};

export const homeRoutes = [
  {
    path: "/home/*",
    element: <Home />,
    children: [
      { index: true, element: <TaskContainer /> },
      { path: "today", element: <FilteredContainer filters={todayFilters} /> },
      {
        path: "tomorrow",
        element: <FilteredContainer filters={tomorrowFilters} />,
      },
      { path: "filtered", element: <FilteredContainer /> },
      { path: "calendar", element: <CalendarContainer /> },
      { path: "tags-and-filters", element: <TagsContainer /> },
      { path: ":listId", element: <TaskContainer /> },
    ],
  },
];
