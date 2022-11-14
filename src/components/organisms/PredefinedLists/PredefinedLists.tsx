import ActiveCount from "components/atoms/ActiveCount/ActiveCount";
import ListItem from "components/molecules/ListItem/ListItem";

import * as S from "./styles";
import { useLists } from "lib/lists";

const PredefinedLists = () => {
  const { getInbox: inbox } = useLists();

  return (
    <S.List>
      <ListItem text="Inbox" to="/home/" icon={<S.WhiteInboxIcon />}>
        <ActiveCount count={inbox?.activeCount} />
      </ListItem>
      <ListItem text="Today" to="/home/today" icon={<S.FuchsiaTodayIcon />} />

      <ListItem
        text="Tomorrow"
        to="/home/tomorrow"
        icon={<S.IndigoTomorrowIcon />}
      />

      <ListItem
        text="Calendar"
        to="/home/calendar"
        icon={<S.SkyCalendarIcon />}
      />

      <ListItem
        text="Tags, filters"
        to="/home/tags-and-filters"
        icon={<S.RoseTagsIcon />}
      />
    </S.List>
  );
};

export default PredefinedLists;
