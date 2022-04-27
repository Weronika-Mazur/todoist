import tw from "tailwind-styled-components";

export const Backdrop = tw.div`
fixed
z-[60]
w-full
h-full
top-0
left-0
`;

export const DropDownList = tw.ul`
z-[65]
bg-main-500
w-20
text-sm
rounded-md
fixed
`;

export const ListItem = tw.li`
hover:bg-main-300
hover:text-slate-100
p-2
text-center
cursor-pointer
`;
