import tw from "tailwind-styled-components";

export const BusyAnimation = tw.div` 
 w-full
flex
items-center
justify-center
py-[31px]
bg-main-700 
border-t-2 
border-main-300  
rounded-md
mt-6
`;

export const TaskCreatorContainer = tw.div`
px-5
py-2
flex
items-center
gap-3.5
bg-main-700 
border-t-2 
border-main-300 
rounded-md
mt-6
mb-1 
`;

export const TaskCreatorInput = tw.input`
m-4
text-lg
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
