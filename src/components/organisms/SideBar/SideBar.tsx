import { useAppDispatch } from "store/hooks";
import { setShowModal } from "features/app/appSlice";

import Button from "components/atoms/Button/Button";
import UserListItem from "components/molecules/UserListItem/UserListItem";
import PredefinedLists from "../PredefinedLists/PredefinedLists";

import * as S from "./styles";
import { Modal, SideBarProps } from "types/type";
import { useLists } from "lib/lists";

const SideBar = ({ isVisible }: SideBarProps) => {
  const dispatch = useAppDispatch();
  const { getUsersLists: listArray } = useLists();

  const handleShowListCreator = () => {
    dispatch(setShowModal(Modal.CreateList));
  };

  return (
    <S.SideBarNav $isVisible={isVisible}>
      <S.SideBarContainer $isVisible={isVisible}>
        <PredefinedLists />
        <S.ButtonContainer>
          <Button onClick={handleShowListCreator} text="new list" />
        </S.ButtonContainer>
        <S.UserList>
          {listArray?.map((list) => (
            <UserListItem
              key={list.listId}
              listId={String(list.listId)}
              name={list.name}
              color={list.color}
              activeCount={list.activeCount}
            />
          ))}
        </S.UserList>
      </S.SideBarContainer>
    </S.SideBarNav>
  );
};

export default SideBar;
