import tw from "tailwind-styled-components";
import styled from "styled-components";

export const Backdrop = tw.div`
fixed
z-[900]
w-full
h-full
top-0
left-0
`;

const FasterAnimation = styled.ul`
  --animate-duration: 0.2s;
`;

export const DropDownList = tw(FasterAnimation)`
z-[999]
bg-main-500
w-fit
text-sm
rounded-md
text-main-100
font-body
font-medium
shadow-lg
animate__animated  animate__fadeIn
`;
