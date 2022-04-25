import { useAppDispatch } from "store/hooks";
import { setDropDown, setShowModal } from "features/list/listSlice";

import ListTitle from "components/atoms/ListTitle/ListTitle";
import ActiveCount from "components/atoms/ActiveCount/ActiveCount";

import * as S from "./styles";
import { ListColors } from "types/type";

import DotIcon from "assets/DotIcon";
import OptionsIcon from "assets/OptionsIcons";

interface ListItemProps {
  name: string;
  color: ListColors;
  id: string;
  number?: number;
}

const ListItem = ({ name, color, id, number }: ListItemProps) => {
  const dispatch = useAppDispatch();

  const handleShowMenu = (e: React.MouseEvent<HTMLElement>) => {
    dispatch(setDropDown({ id, active: true, x: e.clientX, y: e.clientY }));
    dispatch(setShowModal("dropDown"));
  };

  return (
    <S.ListItemContainer>
      <S.Container $color={color}>
        <DotIcon />
      </S.Container>
      <div className="w-full flex truncate md:w-auto">
        <ListTitle listId={id} text={name} />
        <ActiveCount count={number} className="options-count" />
      </div>
      <S.OptionsButton onClick={handleShowMenu}>
        <OptionsIcon className="fill-main-300 w-4 h-4 " />
      </S.OptionsButton>
    </S.ListItemContainer>
  );
};

export default ListItem;
