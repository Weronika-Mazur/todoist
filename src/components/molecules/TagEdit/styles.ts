import CrossIcon from "assets/CrossIcon";
import tw from "tailwind-styled-components";

export const Backdrop = tw.div`
fixed
z-[30]
w-full
h-full
top-0
left-0
bg-backdrop
`;

export const EditContainer = tw.div`
md:relative
sticky
bottom-4
md:bottom-0
z-[40]
flex 
justify-between 
items-center 
gap-3.5 
py-4 
px-4 
border-b-[3px] 
border-main-600 
rounded-md 
bg-main-500
`;

export const EditInput = tw.input`
m-0 
focus:outline-none 
bg-transparent 
ml-2 
w-full 
text-base 
text-main-100 
font-body 
font-medium
`;

export const GreyCrossIcon = tw(CrossIcon)`
fill-main-300
`;
