import tw from "tailwind-styled-components";

interface MainContainerProps {
  $isVisible: boolean;
}

export const MainContainer = tw.div<MainContainerProps>`
p-8 
w-full 
md:pl-[18rem] 
md:block
${(p: MainContainerProps) => (p.$isVisible ? " hidden " : "block")}
`;
