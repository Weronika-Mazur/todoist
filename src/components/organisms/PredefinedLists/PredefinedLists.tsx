import { useAppSelector } from "store/hooks";
import { NavLink } from "react-router-dom";

import { selectInbox } from "features/list/listSlice";

import ListTitle from "components/atoms/ListTitle/ListTitle";
import ActiveCount from "components/atoms/ActiveCount/ActiveCount";

import * as S from "./styles";

const PredefinedLists = () => {
  const inbox = useAppSelector(selectInbox);

  return (
    <S.List>
      <S.PredefinedListItem>
        <S.WhiteInboxIcon />
        <NavLink to="/home/">
          {({ isActive }) => (
            <ListTitle listId={inbox.listId} text="inbox" isActive={isActive} />
          )}
        </NavLink>
        <ActiveCount count={inbox.activeCount} />
      </S.PredefinedListItem>

      <S.PredefinedListItem>
        <S.FuchsiaTodayIcon />
        <NavLink to="/home/today">
          {({ isActive }) => (
            <ListTitle listId="today" text="Today" isActive={isActive} />
          )}
        </NavLink>
      </S.PredefinedListItem>

      <S.PredefinedListItem>
        <S.IndigoTomorrowIcon />
        <NavLink to="/home/tomorrow">
          {({ isActive }) => (
            <ListTitle listId="tomorrow" text="Tomorrow" isActive={isActive} />
          )}
        </NavLink>
      </S.PredefinedListItem>

      <S.PredefinedListItem>
        <S.SkyCalendarIcon />
        <NavLink to="/home/calendar">
          {({ isActive }) => (
            <ListTitle listId="calendar" text="Calendar" isActive={isActive} />
          )}
        </NavLink>
      </S.PredefinedListItem>

      <S.PredefinedListItem>
        <S.RoseTagsIcon />
        <NavLink to="/home/tags-and-filters">
          {({ isActive }) => (
            <ListTitle
              listId="tags-and-filters"
              text="Tags, filters"
              isActive={isActive}
            />
          )}
        </NavLink>
      </S.PredefinedListItem>
    </S.List>
  );
};

export default PredefinedLists;
