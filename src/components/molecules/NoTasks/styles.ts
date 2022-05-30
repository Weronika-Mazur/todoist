import tw from "tailwind-styled-components";
import Empty from "assets/Empty";

export const EmptyIllustrationContainer = tw.div`
flex 
flex-col 
w-full 
items-center 
justify-center 
mt-24 
`;

export const EmptyIllustration = tw(Empty)`
md:w-1/2 
w-2/3
h-fit
max-w-[50vh]
`;

export const NotFoundText = tw.p`
mt-4 
text-main-300
`;
