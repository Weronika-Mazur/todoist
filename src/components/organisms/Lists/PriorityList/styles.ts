import PriorityIcon from "assets/PriorityIcon";
import tw from "tailwind-styled-components";
import { Priority } from "types/type";
import { PriorityColors } from "utils/constants";

export const PriorityList = tw.ul`
flex 
flex-col 
mt-6 
bg-main-700 
rounded-md

`;

interface PiorityIconProps {
  $color: Priority;
}

export const TaskPriorityIcon = tw(PriorityIcon)`
w-4
h-4
sm:w-5
sm:h-5
ml-0.5 
mr-1.5
animate__animated animate__fast animate__fadeInUp 
${(p: PiorityIconProps) => PriorityColors[p.$color]}
`;

export const ListItem = tw.li`
border-b-[3px] 
border-main-600 
rounded-md
py-4 
pl-3
flex
justify-center
items-center
`;

export const ListItemText = tw.p`
ml-2 
w-full
text-main-100
cursor-pointer
animate__animated animate__fast animate__fadeInUp 
`;

export const PriorityHeader = tw.h3`
mt-5
text-lg
pl-0
pb-1.5

text-center
font-medium
text-main-100
border-b-2 
border-main-300
`;
