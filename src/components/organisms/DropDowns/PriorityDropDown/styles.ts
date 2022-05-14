import tw from "tailwind-styled-components";
import styled from "styled-components";

import { Priority } from "../../../../types/type";
import PriorityIcon from "assets/PriorityIcon";
import { PriorityColors } from "utils/constants";

const ListItemHover = styled.li`
  &:hover {
    .icon {
      fill: #bdc1ff;
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
py-2.5
cursor-pointer
w-full
flex

pr-8
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

export const ListItemText = tw.p`
ml-1.5
text-main-100
text
`;
