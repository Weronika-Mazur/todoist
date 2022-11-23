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

export const Text = tw.p`
text-center
my-2
text-main-300
font-normal
text-red-400
`;

export const Title = tw.h1`
text-slate-100
text-2xl
font-bold
mt-8
text-center

`;

export const Label = tw.label`
my-2
text-lg 
text-main-100 
font-medium
animate__animated  animate__fadeInUp

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
font-normal

`;

export const InputContainer = tw.div`
flex 
justify-between 
items-center 
gap-3.5 
py-2 
px-4 
border-t-2
border-main-300 
rounded-md 
mb-1 

bg-main-500
`;
