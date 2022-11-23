import styled from "styled-components";
import tw from "tailwind-styled-components";

import CalendarIcon from "assets/CalendarIcon";
import CrossIcon from "assets/CrossIcon";
import EditIcon from "assets/EditIcon";
import TagIcon from "assets/TagIcon";

import { TaskStatus, Priority } from "types/todo";
import { PriorityBorderColors } from "utils/constants";

const TaskItemHover = styled.div`
  &:hover {
    .cross-button,
    .edit-button {
      visibility: visible;
    }
  }
`;

export const Task = tw(TaskItemHover)`
border-b-[3px] 
border-main-600 
rounded-md
py-4 
`;

export const TaskDetailsContainer = tw.div`
flex 
pl-[3.2rem] 

flex-wrap
`;

export const TaskItemContainer = tw.div`
flex 
justify-between 
items-center 
gap-3.5 

px-4 

`;

export const Circle = tw.div`
rounded-full 
w-3 
h-3 

`;

interface TaskProps {
  $status: TaskStatus;
  $color: Priority;
}

const isCompleted = (state: TaskStatus) => state === "completed";

export const TaskText = tw.p<TaskProps>`
ml-2 
w-full
animate__animated animate__fast animate__fadeInUp 
z-[0]
${(p: TaskProps) => (isCompleted(p.$status) ? " text-main-500 " : "")}
`;

export const TaskButton = tw.button<TaskProps>`
rounded-full 
border-2 
animate__animated animate__fast animate__fadeInUp 
z-initial
${(p: TaskProps) =>
  isCompleted(p.$status) ? " border-main-500" : PriorityBorderColors[p.$color]}
`;

export const CrossButton = tw.button`
cross-button 
invisible
`;

export const EditButton = tw.button`
edit-button 
invisible
`;

export const GreyCrossIcon = tw(CrossIcon)`
fill-main-300
`;

export const GreyEditIcon = tw(EditIcon)`
fill-main-300
`;

export const TaskTomorrowIcon = tw(CalendarIcon)<TaskProps>`

w-[1.1rem] 
h-[1.1rem] 
ml-0.5 
mr-1.5

animate__animated animate__fast animate__fadeInUp 
${(p: TaskProps) => (isCompleted(p.$status) ? " fill-main-500 " : "fill-blue ")}
`;

export const TaskTagIcon = tw(TagIcon)<TaskProps>`

w-3
h-5
ml-0.5 
mr-1.5
animate__animated animate__fast animate__fadeInUp 
${(p: TaskProps) =>
  isCompleted(p.$status) ? " fill-main-500 " : "fill-main-300"}
`;

export const DetailsText = tw.p<TaskProps>`
mr-2
text-xs
sm:text-sm


animate__animated animate__fast animate__fadeInUp 
${(p: TaskProps) =>
  isCompleted(p.$status) ? " text-main-500 " : "text-main-300"}
`;

export const DetailsItemContainer = tw.div`
flex 
mt-3
`;
