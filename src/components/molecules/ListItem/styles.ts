import tw from "tailwind-styled-components";

interface ListItemContainerProps {
  $selected: string;
}

export const ListItemContainer = tw.li`
py-1.5
pl-1
flex
items-center
${(p: ListItemContainerProps) => (p.$selected ? "bg-main-500 rounded-md" : "")}
`;

export const TitleContainer = tw.div`
w-full 
flex 
truncate 
md:w-auto
`;
