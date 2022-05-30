import { useAppDispatch, useAppSelector } from "store/hooks";
import {
  changeActiveListID,
  selectActiveListID,
  selectInbox,
  setActiveListID,
} from "features/list/listSlice";
import { fetchTaskArray } from "features/todo/todoSlice";

import ListTitle from "components/atoms/ListTitle/ListTitle";
import ActiveCount from "components/atoms/ActiveCount/ActiveCount";

import * as S from "./styles";
import { getTodayString, getTomorrowString } from "utils/helpers";

const PredefinedLists = () => {
  const inbox = useAppSelector(selectInbox);
  const activeList = useAppSelector(selectActiveListID);

  const dispatch = useAppDispatch();

  const handleChangeActiveList = (listId: string) => {
    dispatch(changeActiveListID(listId));
  };

  const handleSetActiveList = (listId: string) => {
    dispatch(setActiveListID(listId));
  };

  const handleFetchToday = () => {
    const filters = {
      date: getTodayString(),
    };
    dispatch(fetchTaskArray(undefined, filters));
    dispatch(setActiveListID("Today"));
  };

  const handleFetchTomorrow = () => {
    const filters = {
      date: getTomorrowString(),
    };
    dispatch(fetchTaskArray(undefined, filters));
    dispatch(setActiveListID("Tomorrow"));
  };

  const handleFetchCalendar = () => {
    const filters = {
      date: `ge${getTodayString()}`,
    };
    dispatch(fetchTaskArray(undefined, filters));
    dispatch(setActiveListID("Calendar"));
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
          activeList={activeList}
        />
        <ActiveCount count={inbox.activeCount} />
      </S.PredefinedListItem>

      <S.PredefinedListItem>
        <S.FuchsiaTodayIcon />
        <ListTitle
          listId="Today"
          text="Today"
          onClick={handleFetchToday}
          activeList={activeList}
        />
      </S.PredefinedListItem>

      <S.PredefinedListItem>
        <S.IndigoTomorrowIcon />
        <ListTitle
          listId="Tomorrow"
          text="Tomorrow"
          onClick={handleFetchTomorrow}
          activeList={activeList}
        />
      </S.PredefinedListItem>

      <S.PredefinedListItem>
        <S.SkyCalendarIcon />
        <ListTitle
          listId="Calendar"
          text="Calendar"
          onClick={handleFetchCalendar}
          activeList={activeList}
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
          activeList={activeList}
        />
      </S.PredefinedListItem>
    </S.List>
  );
};

export default PredefinedLists;
