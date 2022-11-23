import tw from "tailwind-styled-components";

export const ListCreatorInput = tw.input`

text-lg
py-3
px-4
bg-transparent
w-full
mx-0
placeholder:text-indigo-400 
font-body 
text-main-100 
font-medium 
placeholder:font-light
focus:outline-none
`;

export const InputContainer = tw.div`
flex
justify-center
items-center
px-3.5
py-0
bg-main-500
w-full
rounded-md
mt-4
mb-3.5
border-t-2
border-main-300
`;

export const Backdrop = tw.div`
fixed
z-30
w-full
h-full
top-0
left-0
flex
justify-center
items-center
shadow
bg-backdrop
`;

export const Card = tw.div`
z-40
bg-main-700
rounded-md
w-[480px]
drop-shadow-2xl
mx-4
`;

export const Title = tw.h1`
text-slate-100
text-2xl
font-bold
mb-6
mt-8
text-center
`;

export const Select = tw.select`
bg-transparent 
border
border-main-300
w-12
  h-12
`;

export const ButtonContainer = tw.div`
flex 
justify-end 
border-t-2 
border-main-500 
px-8 
py-5
gap-4
`;

export const ListEditContainer = tw.div`
px-8 
pb-0
`;
