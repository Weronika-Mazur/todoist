import Flatpickr from "react-flatpickr";

import tw from "tailwind-styled-components";
import styled from "styled-components";

import TomorrowIcon from "assets/TomorrowIcon";
import TodayIcon from "assets/TodayIcon";
import NoneIcon from "assets/NoneIcon";

const ListItemHover = styled.li`
  &:hover {
    .icon {
      fill: #bdc1ff;
    }
    .date {
      color: #bdc1ff;
    }
    .text {
      color: #f8fafc;
    }
  }
`;

export const ListItem = tw(ListItemHover)`
hover:bg-main-300
hover:text-slate-100
p-2
cursor-pointer
w-full
flex
justify-between
`;

export const ListCalendar = tw.li`
p-2
text-center
cursor-pointer
w-full

`;

export const TaskTomorrowIcon = tw(TomorrowIcon)`
fill-main-300  
w-[1.4rem] 
h-[1.4rem] 
ml-0.5 
mr-1.5
icon
`;

export const TaskTodayIcon = tw(TodayIcon)`
fill-main-300 
w-[1.4rem] 
h-[1.4rem] 
ml-0.5 
mr-1.5
icon
`;

export const TaskNoneIcon = tw(NoneIcon)`
fill-main-300  
w-[1.4rem] 
h-[1.4rem] 
ml-0.5 
mr-1.5
icon
`;

export const ListItemText = tw.p`
ml-1
text-main-100
text
`;

export const ListItemDate = tw.p`
ml-1
text-main-300
date
`;

export const Calendar = tw(Flatpickr)`
bg-main-500 
w-full 
font-medium 
text-center 
py-2  
focus:outline-none 
hidden
`;
