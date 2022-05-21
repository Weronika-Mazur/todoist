import { useAppSelector } from "store/hooks";
import { selectInbox } from "../../../features/list/listSlice";

import ListTitle from "components/atoms/ListTitle/ListTitle";
import ActiveCount from "components/atoms/ActiveCount/ActiveCount";
import * as S from "./styles";

const PredefinedLists = () => {
  const inbox = useAppSelector(selectInbox);

  return (
    <S.List>
      <S.PredefinedListItem>
        <S.WhiteInboxIcon />
        <ListTitle listId={inbox.listId} text="Inbox" />
        <ActiveCount count={inbox.activeCount} />
      </S.PredefinedListItem>

      <S.PredefinedListItem>
        <S.FuchsiaTodayIcon />
        <ListTitle listId="Today" text="Today" />
      </S.PredefinedListItem>

      <S.PredefinedListItem>
        <S.IndigoTomorrowIcon />
        <ListTitle listId="Tomorrow" text="Tomorrow" />
      </S.PredefinedListItem>

      <S.PredefinedListItem>
        <S.SkyCalendarIcon />
        <ListTitle listId="Calendar" text="Calendar" />
      </S.PredefinedListItem>

      <S.PredefinedListItem>
        <S.RoseTagsIcon />
        <ListTitle
          listId="Tags and filters"
          text="Tags, filters"
          fetchTags={false}
        />
      </S.PredefinedListItem>
    </S.List>
  );
};

export default PredefinedLists;
