import { useAppDispatch, useAppSelector } from "store/hooks";
import { selectListArray, setShowModal } from "features/list/listSlice";

import Button from "components/atoms/Button/Button";
import ListItem from "components/molecules/ListItem/ListItem";
import PredefinedLists from "../PredefinedLists/PredefinedLists";
import * as S from "./styles";

interface SideBarProps {
  isVisible: boolean;
}

const SideBar = ({ isVisible }: SideBarProps) => {
  const dispatch = useAppDispatch();
  const listArray = useAppSelector(selectListArray);

  const handleShowListCreator = () => {
    dispatch(setShowModal("createList"));
  };

  return (
    <S.SideBarNav $isVisible={isVisible}>
      <S.SideBarContainer $isVisible={isVisible}>
        <PredefinedLists />
        <S.ButtonContainer>
          <Button onClick={handleShowListCreator} text="new list" />
        </S.ButtonContainer>
        <S.UserList>
          {listArray.map((list) => (
            <ListItem
              key={list.listId}
              id={String(list.listId)}
              name={list.name}
              color={list.color}
              number={list.activeCount}
            />
          ))}
        </S.UserList>
      </S.SideBarContainer>
    </S.SideBarNav>
  );
};

export default SideBar;
