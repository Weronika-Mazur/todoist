import { useAppDispatch, useAppSelector } from "store/hooks";
import {
  changeActiveListID,
  selectInbox,
  setActiveListID,
} from "../../../features/list/listSlice";

import ListTitle from "components/atoms/ListTitle/ListTitle";
import ActiveCount from "components/atoms/ActiveCount/ActiveCount";
import * as S from "./styles";
import { fetchFilteredTaskArray } from "features/todo/todoSlice";
import { TaskFilters } from "types/type";

const PredefinedLists = () => {
  const inbox = useAppSelector(selectInbox);

  const dispatch = useAppDispatch();

  const handleChangeActiveList = (listId: string) => {
    dispatch(changeActiveListID(listId));
  };

  const handleFetchFilteredList = (
    activeList: string,
    filters?: TaskFilters
  ) => {
    dispatch(fetchFilteredTaskArray(undefined, filters));
    dispatch(setActiveListID(activeList));
  };

  const handleSetActiveList = (listId: string) => {
    dispatch(setActiveListID(listId));
  };

  const getToday = () => {
    const now = new Date();
    return now.toLocaleDateString("en-CA");
  };

  const getTomorrow = () => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    return date.toLocaleDateString("en-CA");
  };

  return (
    <S.List>
      <S.PredefinedListItem>
        <S.WhiteInboxIcon />
        <ListTitle
          listId={inbox.listId}
          text="Inbox"
          onClick={() => {
            handleChangeActiveList(inbox.listId);
          }}
        />
        <ActiveCount count={inbox.activeCount} />
      </S.PredefinedListItem>

      <S.PredefinedListItem>
        <S.FuchsiaTodayIcon />
        <ListTitle
          listId="Today"
          text="Today"
          onClick={() => {
            handleFetchFilteredList("Today", {
              date: getToday(),
            });
          }}
        />
      </S.PredefinedListItem>

      <S.PredefinedListItem>
        <S.IndigoTomorrowIcon />
        <ListTitle
          listId="Tomorrow"
          text="Tomorrow"
          onClick={() => {
            handleFetchFilteredList("Tomorrow", {
              date: getTomorrow(),
            });
          }}
        />
      </S.PredefinedListItem>

      <S.PredefinedListItem>
        <S.SkyCalendarIcon />
        <ListTitle
          listId="Calendar"
          text="Calendar"
          onClick={() => {
            handleFetchFilteredList("Calendar", {
              date: "ge" + getToday(),
            });
          }}
        />
      </S.PredefinedListItem>

      <S.PredefinedListItem>
        <S.RoseTagsIcon />
        <ListTitle
          listId="Tags and filters"
          text="Tags, filters"
          onClick={() => {
            handleSetActiveList("Tags and filters");
          }}
        />
      </S.PredefinedListItem>
    </S.List>
  );
};

export default PredefinedLists;
