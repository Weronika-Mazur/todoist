import styled from "styled-components";
import tw from "tailwind-styled-components";

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

interface Checked {
  $state: "completed" | "active";
}

const isCompleted = (state: "completed" | "active") => state === "completed";

export const TaskText = tw.p<Checked>`
ml-2 
w-full
${(p: Checked) => (isCompleted(p.$state) ? " text-main-500 " : "")}
`;

export const TaskButton = tw.button<Checked>`
rounded-full 
border-2 
${(p: Checked) => (isCompleted(p.$state) ? " border-main-500" : "border-blue")}
`;
