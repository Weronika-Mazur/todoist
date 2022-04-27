import MenuIcon from "assets/MenuIcon";
import UserIcon from "assets/UserIcon";
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
min-w-0
`;

export const UserName = tw.p`
text-violet-100 
font-medium 
m-0
mx-3
truncate
min-w-0
flex-1
`;

export const LogOutButton = tw.button`
text-slate-100
font-bold
mr-4
`;

export const MenuButton = tw.button`
md:hidden
block
`;

export const LogoContainer = tw.div`
flex 
justify-center 
items-center
`;

export const WhiteMenuIcon = tw(MenuIcon)`
fill-main-100 
w-5 
h-5 
ml-3
`;

export const DarkUserIcon = tw(UserIcon)`
w-7 
h-7 
mr-3 
fill-main-700
`;
