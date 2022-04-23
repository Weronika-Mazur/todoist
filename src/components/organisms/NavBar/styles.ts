import tw from "tailwind-styled-components";

export const Bar = tw.nav`
fixed
w-screen
top-0
left-0
m-0
flex
items-center
justify-between
bg-blue
py-3
z-[8]
`;

export const Logo = tw.h1`
p-0
m-0
ml-3.5
text-slate-100 
font-extrabold 
text-xl
`;

export const NavContainer = tw.div`
flex
items-center
mr-3.5
text-slate-100
`;

export const UserName = tw.p`
text-violet-100 
font-medium 
m-0
mr-3
`;

export const LogOutButton = tw.button`
text-slate-100
font-bold
mr-4
`;
