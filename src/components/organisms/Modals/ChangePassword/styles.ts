import tw from "tailwind-styled-components";

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
mx-4
drop-shadow-2xl
`;

export const ButtonContainer = tw.div`
flex 
justify-center
border-t-2 
border-main-500 
px-8 
py-5
gap-4
`;

export const Title = tw.h1`
text-slate-100
text-2xl
font-bold
mt-8
text-center
`;
