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

export const SideBarNav = tw.nav`
fixed 
w-[16rem] 
h-full 
pb-[3.5rem]
`;

export const SideBarContainer = tw(SideBarScrollbar)`
mr-0 
h-full 
overflow-y-auto  
font-medium  
bg-main-700 
overflow-y-auto 
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
