import tw from "tailwind-styled-components";
import styled from "styled-components";

import CheckIcon from "assets/CheckIcon";
import PlusIcon from "../../../../assets/PlusIcon";
import BusyIcon from "assets/BusyIcon";

const TagsListItemHover = styled.li`
  &:hover {
    .icon {
      fill: #bdc1ff;
    }
    .text {
      color: #f8fafc;
    }
  }
`;

export const TagsListItem = tw(TagsListItemHover)`
max-w-[16rem]
cursor-pointer
w-full
`;

const ListScrollbar = styled.ul`
  &::-webkit-scrollbar {
    width: 0.3em;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #6f76c8;
  }
`;

export const TagList = tw(ListScrollbar)`
overflow-y-auto max-h-80 
`;

export const ListItemText = tw.p`
ml-1
text-main-100
text
`;

export const TagItem = tw.li`
cursor-pointer
flex
justify-between
items-center
hover:bg-main-300
hover:text-slate-100
p-3

`;

export const TagLabel = tw.p`
break-words
truncate
w-full
`;

interface CheckmarkProps {
  $isChecked: boolean;
}

export const Checkmark = tw.span`
ml-8
bg-transparent
border
border-blue
rounded-md
hover-background
p-1
flex
justify-center
items-center
${(p: CheckmarkProps) => (p.$isChecked ? " bg-blue " : "")}
`;

export const Checked = tw(CheckIcon)`
fill-main-100
w-[0.6rem] 
h-[0.6rem] 
icon
${(p: CheckmarkProps) => (p.$isChecked ? " " : "invisible")}
`;

export const TagInput = tw.input`
m-1

bg-transparent
w-full
ml-2
placeholder:text-main-300 
font-body 
text-main-100 
font-medium 
placeholder:font-light
focus:outline-none
`;

const HoverTagAddButton = styled.button`
  &:hover {
    .icon {
      fill: #bdc1ff;
    }
  }
`;

export const InputListItem = tw.li`
max-w-[16rem]
cursor-pointer
w-full
p-2 
border-b 
border-main-300 
flex
`;

export const TagPlusIcon = tw(PlusIcon)`
fill-main-300
icon
w-4
h-4
ml-0.5 
mr-1.5
`;

export const TagAddButton = tw(HoverTagAddButton)`

`;

export const BusyAnimation = tw.div` 
m-1
bg-transparent
ml-2
px-16
py-1
 w-full
flex
items-center
justify-center
`;

export const TagBusyIcon = tw(BusyIcon)`
w-16 
h-3
`;
