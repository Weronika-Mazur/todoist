import DotIcon from "assets/DotIcon";
import tw from "tailwind-styled-components";

interface ContainerProps {
  $fill: string;
}

export const Title = tw.p`
mr-1
text-main-100
`;

export const ColorContainer = tw.div<ContainerProps>`
${(p: ContainerProps) => p.$fill}
`;

export const ColorPicker = tw.div`
flex 
mb-4 
ml-1 
items-center 
text-main-100
`;

export const ColorIcon = tw(DotIcon)`
w-8 h-8 hover:scale-110 cursor-pointer
`;
