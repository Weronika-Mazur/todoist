import tw from "tailwind-styled-components";
import styled from "styled-components";

const SideBarScrollbar = styled.div`
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

interface SideBarProps {
  $isVisible: boolean;
}

export const SideBarNav = tw.nav<SideBarProps>`
fixed
w-full 
md:w-[16rem] 
h-full 
pb-[3.5rem]
z-[20]
${(p: SideBarProps) => (p.$isVisible ? " block " : "hidden")}
md:block
`;

export const SideBarContainer = tw(SideBarScrollbar)<SideBarProps>`
mr-0 
h-full 
overflow-y-auto  
font-medium  
bg-main-700 
overflow-y-auto 
animate__animated animate__faster animate__fadeInLeft
${(p: SideBarProps) => (p.$isVisible ? "block " : "hidden")}
md:block
`;

export const ButtonContainer = tw.div`
flex 
justify-center 
items-center
`;

export const UserList = tw.ul`
py-8  
pt-3 
m-5 
mt-0 
`;
