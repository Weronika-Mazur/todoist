import { useAppDispatch } from "store/hooks";
import { setDropDown, setShowModal } from "features/list/listSlice";

import ListTitle from "components/atoms/ListTitle/ListTitle";

import * as S from "./styles";
import { ListColors } from "types/type";

import DotIcon from "assets/DotIcon";

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
      <S.TitleContainer>
        <ListTitle listId={id} text={name} />
        <S.OptionsActiveCount count={number} />
      </S.TitleContainer>
      <S.OptionsButton onClick={handleShowMenu}>
        <S.GreyOptionsIcon />
      </S.OptionsButton>
    </S.ListItemContainer>
  );
};

export default ListItem;
