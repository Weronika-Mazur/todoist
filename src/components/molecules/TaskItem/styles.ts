import styled from "styled-components";
import tw from "tailwind-styled-components";
import { TaskStatus } from "types/type";

const TaskItemHover = styled.div`
  &:hover {
    .cross-button,
    .edit-button {
      visibility: visible;
    }
  }
`;

export const TaskItemContainer = tw(TaskItemHover)`
flex 
justify-between 
items-center 
gap-3.5 
py-4 
px-4 
border-b-[3px] 
border-main-600 
rounded-md
`;

export const Circle = tw.div`
rounded-full 
w-3 
h-3 
bg-main-500
`;

interface TaskProps {
  $status: TaskStatus;
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
  isCompleted(p.$status) ? " border-main-500" : "border-blue"}
`;
