import tw from "tailwind-styled-components";

interface Title {
  $selected: string;
}

interface ListTitleProps {
  text: string;
  listId: string;
  fetchTags?: boolean;
  activeList: string;
  onClick?: () => void;
}

const ListTitle = ({ text, listId, onClick, activeList }: ListTitleProps) => {
  const isSelected = (listID: string) => activeList === listID;

  const Title = tw.p<Title>`
  ml-2
  break-words
  truncate

${(p: Title) =>
  isSelected(p.$selected)
    ? "text-slate-100 font-extrabold"
    : "font-regular text-main-100 cursor-pointer"}
`;

  return (
    <Title $selected={listId} onClick={onClick} title={text}>
      {text}
    </Title>
  );
};

export default ListTitle;
