import { useAppDispatch, useAppSelector } from "store/hooks";
import tw from "tailwind-styled-components";
import {
  selectActiveListID,
  changeActiveListID,
} from "../../../features/list/listSlice";

interface Title {
  $selected: string;
}

interface ListTitleProps {
  text: string;
  listId: string;
}

const ListTitle = ({ text, listId }: ListTitleProps) => {
  const dispatch = useAppDispatch();
  const activeList = useAppSelector(selectActiveListID);

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

  const handleSelectList = (listId: string) => {
    dispatch(changeActiveListID(listId));
  };
  return (
    <Title
      $selected={listId}
      onClick={() => {
        handleSelectList(listId);
      }}
      title={text}
    >
      {text}
    </Title>
  );
};

export default ListTitle;
