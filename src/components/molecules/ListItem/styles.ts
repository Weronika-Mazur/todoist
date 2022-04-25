import styled from "styled-components";
import tw from "tailwind-styled-components";
import { Colors } from "utils/constants";
import { ListColors } from "../../../types/type";

interface ContainerProps {
  $color: ListColors;
}

const ListItemHover = styled.li`
  &:hover {
    .options-button {
      display: block;
    }

    @media (min-width: 768px) {
      .options-count {
        display: none;
      }
    }
  }
`;

export const ListItemContainer = tw(ListItemHover)`
mt-2 
flex 
items-center 
`;

export const Container = tw.div<ContainerProps>`
  w-6
  h-6
  flex
  justify-center
  items-center
  mr-1
  ${(p: ContainerProps) => Colors[p.$color]}
  `;

export const OptionsButton = tw.button`
 flex 
 self-stretch
  ml-3 
  block 
  options-button
  md:hidden
  `;
