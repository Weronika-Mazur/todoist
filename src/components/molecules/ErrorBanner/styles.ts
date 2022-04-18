import tw from "tailwind-styled-components";

export const Banner = tw.div`

fixed
left-[10%]
bottom-6
w-[80%]
flex
justify-center
items-center
z-10
`;

export const BannerContainer = tw.div`
m-0
text-slate-100
flex
justify-center
items-center
w-[800px]
max-w-[900px]
bg-blue 
rounded-md
p-2
drop-shadow-md
`;

export const ErrorContent = tw.p`
my-3
mx-5
mr-0
text-center
w-full
`;

export const CrossButton = tw.button`
mr-4
py-[5]
px-[6]
flex
justify-center
items-center

`;
