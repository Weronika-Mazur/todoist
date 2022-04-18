import { useAppSelector } from "store/hooks";
import { selectInbox } from "../../../features/list/listSlice";

import CalendarIcon from "../../../assets/CalendarIcon";
import TodayIcon from "../../../assets/TodayIcon";
import TomorrowIcon from "../../../assets/TomorrowIcon";
import InboxIcon from "assets/InboxIcon";
import ListTitle from "components/atoms/ListTitle/ListTitle";
import ActiveCount from "components/atoms/ActiveCount/ActiveCount";
import { PredefinedListItem } from "./styles";

const PredefinedLists = () => {
  const inbox = useAppSelector(selectInbox);

  return (
    <ul className="py-8  m-5   border-b border-main-300">
      <PredefinedListItem>
        <div className="w-4 h-4 ml-1 mr-2 ">
          <InboxIcon className="fill-slate-100" />
        </div>
        <ListTitle listId={inbox.listId} text="Inbox" />
        <ActiveCount count={inbox.activeCount} />
      </PredefinedListItem>
      <PredefinedListItem>
        <div className="w-5 h-5 ml-0.5 mr-1.5 flex justify-center items-center ">
          <TodayIcon className="fill-fuchsia-400" />
        </div>
        <ListTitle listId="Today" text="Today" />
      </PredefinedListItem>
      <PredefinedListItem>
        <div className="w-5 h-5 ml-0.5 mr-1.5  ">
          <TomorrowIcon className="fill-indigo-400" />
        </div>
        <ListTitle listId="Tomorrow" text="Tomorrow" />
      </PredefinedListItem>
      <PredefinedListItem>
        <div className="w-4 h-4 ml-1 mr-2  ">
          <CalendarIcon className="fill-sky-400" />
        </div>
        <ListTitle listId="Calendar" text="Calendar" />
      </PredefinedListItem>
    </ul>
  );
};

export default PredefinedLists;
