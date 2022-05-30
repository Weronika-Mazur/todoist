import styled from "styled-components";
import tw from "tailwind-styled-components";

import CrossIcon from "assets/CrossIcon";
import EditIcon from "assets/EditIcon";
import TagIcon from "assets/TagIcon";

const TagItemHover = styled.li`
  &:hover {
    .cross-button,
    .edit-button {
      visibility: visible;
    }
  }
`;

export const TagList = tw.ul`
flex 
flex-col 
mt-6 
bg-main-700 
rounded-md
`;

export const ListItem = tw(TagItemHover)`
border-b-[3px] 
border-main-600 
rounded-md
py-4 
pl-3
flex
gap-3.5 
pl-3
pr-4 
justify-center
items-center
`;

export const ListItemText = tw.p`
cursor-pointer
w-full
text-main-100
animate__animated animate__fast animate__fadeInUp 
`;

export const TagsHeader = tw.h3`
mt-5
text-lg
pl-0
pb-1.5

text-center
font-medium
text-main-100
border-b-2 
border-main-300
`;

export const TagCreatorContainer = tw.div`
px-5
py-0.5
flex
items-center
gap-3.5
bg-main-700 

rounded-md
mt-5
`;

export const TagCreatorInput = tw.input`
m-4
text-lg
bg-transparent
w-full
ml-2
placeholder:text-main-300 
font-body 
text-main-100 
font-medium 
placeholder:font-light
focus:outline-none
`;

export const CrossButton = tw.button`
cross-button 
invisible
`;

export const EditButton = tw.button`
edit-button 
invisible
`;

export const GreyCrossIcon = tw(CrossIcon)`
fill-main-300
`;

export const GreyEditIcon = tw(EditIcon)`
fill-main-300
`;

export const TaskTagIcon = tw(TagIcon)`
w-6
h-6
ml-0.5 
mr-1.5
animate__animated animate__fast animate__fadeInUp 
fill-blue
`;

export const BusyAnimation = tw.div` 
 w-full
flex
items-center
justify-center
py-6
bg-main-700 

rounded-md
mt-5
`;
