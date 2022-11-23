import tw from "tailwind-styled-components";

import BellIcon from "assets/BellIcon";
import CalendarIcon from "assets/CalendarIcon";
import CogIcon from "assets/CogIcon";
import UserIcon from "assets/UserIcon";

interface SideBarProps {
  $isVisible: boolean;
}

export const SideBarNav = tw.nav<SideBarProps>`
  fixed
  w-full
  md:w-[16rem] 
  h-[94%] 

  
  z-[20]
  ${(p: SideBarProps) => (p.$isVisible ? " block " : "hidden")}
  md:block
  `;

export const SideBarContainer = tw.div<SideBarProps>`
mr-0 
h-full 
overflow-y-auto  
font-medium  
bg-main-800 

overflow-y-auto 
animate__animated animate__faster animate__fadeInLeft
${(p: SideBarProps) => (p.$isVisible ? "block " : "hidden")}
md:block
`;

export const List = tw.ul`
py-8
m-5

`;

export const DarkUserIcon = tw(UserIcon)`
w-[1.3rem] 
h-[1.3rem] 
ml-0.5 
mr-1.5
fill-main-300
`;

export const DarkCogIcon = tw(CogIcon)`
w-[1.5rem] 
h-[1.5rem] 
mr-[0.3rem]
fill-main-300
`;

export const DarkBellIcon = tw(BellIcon)`
w-[1.4rem] 
h-[1.4rem] 
mr-[0.4rem]
fill-main-300
`;

export const DarkCalendarIcon = tw(CalendarIcon)`
fill-main-300
w-[1.2rem] 
h-[1.2rem] 
ml-[0.2rem] 
mr-1.5 
`;
