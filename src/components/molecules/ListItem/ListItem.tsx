import { useAppDispatch } from "store/hooks";

import { changeActiveListID } from "../../../features/list/listSlice";

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
  const dispatch = useAppDispatch();

  const handleSelectList = (listId: string) => {
    dispatch(changeActiveListID(listId));
  };

  return (
    <S.ListItemContainer>
      <S.Container $color={color}>
        <DotIcon />
      </S.Container>
      <S.TitleContainer>
        <ListTitle
          listId={id}
          text={name}
          onClick={() => {
            handleSelectList(id);
          }}
        />
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
