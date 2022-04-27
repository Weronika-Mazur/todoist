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
`;

export const Title = tw.h1`
text-main-100
text-lg
mb-8
mt-10
text-center
mx-2
`;
