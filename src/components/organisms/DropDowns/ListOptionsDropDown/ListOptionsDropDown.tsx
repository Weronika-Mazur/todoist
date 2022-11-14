import { useAppDispatch } from "store/hooks";
import { activateListEditMode } from "features/list/listSlice";
import { setShowModal } from "features/app/appSlice";

import * as S from "./styles";
import { List } from "types/list";

interface ListOptionsDropDownProps {
  list: List;
}

const ListOptionsDropDown = ({ list }: ListOptionsDropDownProps) => {
  const dispatch = useAppDispatch();

  const handleEdit = (e: React.MouseEvent<HTMLElement>) => {
    dispatch(activateListEditMode(list));
    dispatch(setShowModal("editList"));
  };

  const handleDelete = (e: React.MouseEvent<HTMLElement>) => {
    dispatch(activateListEditMode(list));
    dispatch(setShowModal("deleteList"));
  };

  return (
    <>
      <S.ListItem onClick={handleEdit}>
        <S.ListEditIcon />
        <S.ListItemText>edit</S.ListItemText>
      </S.ListItem>
      <S.ListItem onClick={handleDelete}>
        <S.ListCrossIcon />
        <S.ListItemText>delete</S.ListItemText>
      </S.ListItem>
    </>
  );
};

export default ListOptionsDropDown;
