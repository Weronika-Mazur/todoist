import tw from "tailwind-styled-components";

import CalendarIcon from "assets/CalendarIcon";
import PriorityIcon from "assets/PriorityIcon";
import TagIcon from "assets/TagIcon";
import { Priority } from "types/todo";
import { PriorityColors } from "utils/constants";

export const TaskCalendarIcon = tw(CalendarIcon)`
fill-blue 
w-[1.4rem] 
h-[1.4rem] 
ml-0.5 
mr-1.5
`;

interface PiorityIconProps {
  $color: Priority;
}

export const TaskPriorityIcon = tw(PriorityIcon)`
w-5
h-5
ml-0.5 
mr-1.5
${(p: PiorityIconProps) => PriorityColors[p.$color]}
`;

export const TaskTagIcon = tw(TagIcon)`
fill-blue
w-5
h-5
ml-0.5 
mr-1.5
`;

export const TagButton = tw.button`
bg-transparent 
border
border-blue
text-main-100 
font-normal text-sm 
px-5
py-1 
rounded-md
mx-2
hover:bg-main-600
hover:text-slate-100
whitespace-nowrap
w-fit
`;

export const TaskDetailsContainer = tw.div`
flex 
lg:flex-row 

justify-center 
items-center
bg-main-700 

lg:justify-start 
gap-1
p-3 
py-3 
rounded-md 
flex-wrap
animate__animated 
animate__fast 
animate__fadeInDown
`;

export const Details = tw.div`
flex 
gap-1 
items-center 
text-main-300 
font-normal 
text-sm
w-full
justify-center
lg:justify-start
lg:w-fit
py-1.5
`;

interface DetailsTextProps {
  $isSet: boolean;
}

export const DetailsText = tw.p`
mr-3
text-xs
sm:text-sm
${(p: DetailsTextProps) =>
  p.$isSet ? " text-main-100 font-medium" : "text-main-300"}
`;

export const DetailsButton = tw.button`
flex 
justify-center 
items-center
whitespace-nowrap
`;
