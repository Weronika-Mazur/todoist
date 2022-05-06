import tw from "tailwind-styled-components";
import { Field, ErrorMessage } from "formik";

export const Label = tw.label`
px-0 
py-2 
text-lg 
text-main-100 
font-medium
animate__animated  animate__fadeInUp

`;

export const SubmitButton = tw.button`
bg-blue 
text-main-100 
py-4 
rounded-md 
mt-7 
text-slate-100 
font-bold 
animate__animated  animate__fadeIn
`;

export const FormField = tw(Field)`
bg-transparent 
border-b 
p-2 
text-lg  
font-medium 
border-main-300 
focus:outline-none 
text-slate-100
animate__animated  animate__fadeIn
`;

export const FormErrorMessage = tw(ErrorMessage)`
text-pink-400 
mt-1 
font-light 
text-sm
`;
