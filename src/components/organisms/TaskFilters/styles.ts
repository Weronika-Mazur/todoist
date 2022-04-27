import tw from "tailwind-styled-components";
import { Filter } from "types/type";

interface FilterItem {
  $selected: Filter;
}

export const FilterOption = tw.li<FilterItem>`
font-medium
mx-[4px]
${(p: FilterItem) =>
  p.$selected
    ? " text-blue hover:text-blue font-extrabold font-base"
    : " cursor-pointer"}
`;

export const FilterList = tw.ul`
flex
justify-between
pl-4`;

export const ClearCompleted = tw.p`
hover:cursor-pointer
font-medium
text-center
`;

export const FilterBar = tw.section`
flex 
justify-between 
items-center 
text-sm 
border-b-2 
border-main-300
mt-5
py-1.5
px-3
`;

export const TasksLeftCounter = tw.p`
text-center
`;
