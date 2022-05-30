import CalendarIcon from "assets/CalendarIcon";
import InboxIcon from "assets/InboxIcon";
import TagIcon from "assets/TagIcon";
import TodayIcon from "assets/TodayIcon";
import TomorrowIcon from "assets/TomorrowIcon";
import tw from "tailwind-styled-components";

export const PredefinedListItem = tw.li`
mt-2
flex
items-center
`;

export const SkyCalendarIcon = tw(CalendarIcon)`
fill-sky-400 
w-[1.2rem] 
h-[1.2rem] 
ml-[0.2rem] 
mr-1.5 
`;

export const IndigoTomorrowIcon = tw(TomorrowIcon)`
fill-indigo-400 
w-5 h-5 
ml-0.5 
mr-1.5
`;

export const FuchsiaTodayIcon = tw(TodayIcon)`
fill-fuchsia-400 
w-[1.3rem] 
h-[1.3rem] 
ml-0.5 
mr-1.5
`;

export const WhiteInboxIcon = tw(InboxIcon)`
fill-slate-100 
w-[1.2rem] 
h-[1.2rem] 
ml-[0.2rem] 
mr-[0.4rem]
`;

export const RoseTagsIcon = tw(TagIcon)`
fill-rose-400 
w-[1.2rem] 
h-[1.2rem] 
ml-[0.2rem] 
mr-[0.4rem]
`;

export const List = tw.ul`
py-8
m-5
border-b
border-main-300
`;
