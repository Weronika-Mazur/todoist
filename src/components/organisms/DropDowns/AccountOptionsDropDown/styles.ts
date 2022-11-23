import tw from "tailwind-styled-components";
import styled from "styled-components";

import CogIcon from "assets/CogIcon";
import LogoutIcon from "assets/LogoutIcon";

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
cursor-pointer
w-full
flex
pr-8
items-center
`;

export const ListCogIcon = tw(CogIcon)`
fill-main-300  
w-[1.4rem] 
h-[1.4rem] 
ml-0.5 
mr-1.5
icon
`;

export const ListLogoutIcon = tw(LogoutIcon)`
fill-main-300  
w-[1.4rem] 
h-[1.4rem] 
ml-[0rem]
mr-2
icon
`;

export const ListItemText = tw.p`
ml-1
text-main-100
text
`;
