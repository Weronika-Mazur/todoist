import { ErrorMessage, Field } from "formik";
import tw from "tailwind-styled-components";

export const Label = tw.label`
my-2
text-lg 
text-main-100 
font-medium
animate__animated  animate__fadeInUp

`;

export const EditInput = tw(Field)`
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

export const FormErrorMessage = tw(ErrorMessage)`
text-pink-400 
mt-1 
font-light 
text-sm
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
