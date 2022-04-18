import tw from "tailwind-styled-components";

interface ContainerProps {
  $color: number;
}

const Colors = [
  "fill-green-400",
  "fill-sky-400",
  "fill-violet-400",
  "fill-fuchsia-400",
  "fill-rose-400",
];

export const Container = tw.div<ContainerProps>`
  w-6
  h-6
  flex
  justify-center
  items-center
  mr-1
  ${(p: ContainerProps) => Colors[p.$color]}
  `;
