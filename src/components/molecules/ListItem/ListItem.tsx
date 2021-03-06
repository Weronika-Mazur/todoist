import { NavLink } from "react-router-dom";

import * as S from "./styles";
import { ListColors } from "types/type";

import ListTitle from "components/atoms/ListTitle/ListTitle";
import DotIcon from "assets/DotIcon";
import DropDown from "components/molecules/DropDown/DropDown";
import ListOptionsDropDown from "../../organisms/DropDowns/ListOptionsDropDown/ListOptionsDropDown";

interface ListItemProps {
  name: string;
  color: ListColors;
  id: string;
  number?: number;
}

const ListItem = ({ name, color, id, number }: ListItemProps) => {
  return (
    <S.ListItemContainer>
      <S.Container $color={color}>
        <DotIcon />
      </S.Container>
      <S.TitleContainer>
        <NavLink to={`/home/${id}`}>
          {({ isActive }) => (
            <ListTitle listId={id} text={name} isActive={isActive} />
          )}
        </NavLink>
        <S.OptionsActiveCount count={number} />
      </S.TitleContainer>
      <DropDown
        dropDown={<ListOptionsDropDown id={id} />}
        placement="right-start"
      >
        <S.OptionsButton>
          <S.GreyOptionsIcon />
        </S.OptionsButton>
      </DropDown>
    </S.ListItemContainer>
  );
};

export default ListItem;
