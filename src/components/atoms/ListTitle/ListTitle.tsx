import tw from "tailwind-styled-components";

interface Title {
  $selected: string;
}

interface ListTitleProps {
  text: string;
  listId?: string;
  fetchTags?: boolean;
  isActive?: boolean;
  onClick?: () => void;
}

const ListTitle = ({ text, onClick, isActive }: ListTitleProps) => {
  const Title = tw.p<Title>`
  ml-2
  break-words
  truncate

  ${(p: Title) =>
    p.$selected
      ? "text-slate-100 font-bold cursor-default"
      : "font-regular text-main-100 cursor-pointer"}
  `;

  return (
    <Title $selected={isActive} onClick={onClick} title={text}>
      {text}
    </Title>
  );
};

export default ListTitle;
