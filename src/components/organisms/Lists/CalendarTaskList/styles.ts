import Empty from "assets/Empty";
import tw from "tailwind-styled-components";

export const TaskSection = tw.section`
flex 
flex-col 
mt-6 
bg-main-700 
rounded-md
`;

export const DateHeader = tw.h3`
mt-5
text-lg
pl-0
sm:pl-2
sm:text-left
text-center
font-medium
text-main-100
`;

export const EmptyIllustrationContainer = tw.div`
flex 
flex-col 
w-full 
items-center 
justify-center 
mt-24 
`;

export const EmptyIllustration = tw(Empty)`
w-1/2 
h-fit
`;

export const NotFoundText = tw.p`
mt-4 
text-main-300
`;
