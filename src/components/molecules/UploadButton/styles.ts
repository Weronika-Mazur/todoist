import EditIcon from "assets/EditIcon";
import tw from "tailwind-styled-components";

export const EditButton = tw.label`
bg-transparent 
border
border-main-300
text-slate-100 
font-medium 
pl-6
pr-8    
py-1 
rounded-md
flex
items-center
cursor-pointer
`;

export const ButtonEditIcon = tw(EditIcon)`
fill-main-300  
w-[1rem] 
h-[1rem] 
ml-0.5 
mr-2
icon
`;
