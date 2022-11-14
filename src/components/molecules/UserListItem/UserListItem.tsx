import * as S from "./styles";
import { ListColors } from "types/list";

import DotIcon from "assets/DotIcon";
import DropDown from "components/molecules/DropDown/DropDown";
import ListOptionsDropDown from "../../organisms/DropDowns/ListOptionsDropDown/ListOptionsDropDown";

interface ListItemProps {
  name: string;
  color: ListColors;
  listId: string;
  activeCount: number;
}

const UserListItem = ({ name, color, listId, activeCount }: ListItemProps) => {
  return (
    <S.ListItemHover
      to={`/home/${listId}`}
      text={name}
      icon={
        <S.Container $color={color}>
          <DotIcon />
        </S.Container>
      }
    >
      <>
        <S.OptionsActiveCount count={activeCount} />
        <DropDown
          dropDown={
            <ListOptionsDropDown list={{ name, color, listId, activeCount }} />
          }
          placement="right-start"
        >
          <S.OptionsButton>
            <S.GreyOptionsIcon />
          </S.OptionsButton>
        </DropDown>
      </>
    </S.ListItemHover>
  );
};

export default UserListItem;
