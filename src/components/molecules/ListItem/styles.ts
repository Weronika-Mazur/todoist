import OptionsIcon from "assets/OptionsIcons";
import ActiveCount from "components/atoms/ActiveCount/ActiveCount";
import styled from "styled-components";
import tw from "tailwind-styled-components";
import { Colors } from "utils/constants";
import { ListColors } from "types/type";

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

export const TitleContainer = tw.div`
  w-full 
  flex 
  truncate 
  md:w-auto
  `;

export const OptionsActiveCount = tw(ActiveCount)`
  options-count
  `;

export const GreyOptionsIcon = tw(OptionsIcon)`
  fill-main-300 
  w-4
  h-4 
  `;
