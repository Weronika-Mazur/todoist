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

export const InputContainer = tw.div`
flex 
justify-between 
items-center 
gap-3.5 
py-5 
px-4 
border-t-2 
border-main-500 
rounded-md 
mb-1 
mt-4
bg-main-700
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

export const EditContainer = tw.div`
flex 
flex-col
border-b-[3px] 
border-main-500 
p-0
rounded-b-md 
bg-main-900
`;

export const ButtonContainer = tw.div`
flex 
sm:justify-end
justify-center
bg-transparent
px-3 
py-4
gap-4
`;
