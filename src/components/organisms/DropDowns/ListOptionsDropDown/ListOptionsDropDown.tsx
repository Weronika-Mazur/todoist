import { useAppDispatch } from "store/hooks";
import { setShowModal, activateListEditMode } from "features/list/listSlice";

import * as S from "./styles";

interface ListOptionsDropDownProps {
  id: string;
}

const ListOptionsDropDown = ({ id }: ListOptionsDropDownProps) => {
  const dispatch = useAppDispatch();

  const handleEdit = (e: React.MouseEvent<HTMLElement>) => {
    dispatch(activateListEditMode(id));
    dispatch(setShowModal("editList"));
  };

  const handleDelete = (e: React.MouseEvent<HTMLElement>) => {
    dispatch(activateListEditMode(id));
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
