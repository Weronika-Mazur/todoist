import { useAppDispatch, useAppSelector } from "store/hooks";
import {
  deactivateDropDown,
  setShowModal,
  activateListEditMode,
} from "features/list/listSlice";

import * as S from "./styles";
import { selectDropDown } from "features/list/listSlice";

const DropDownMenu = () => {
  const dispatch = useAppDispatch();
  const dropDownProperties = useAppSelector(selectDropDown);

  const handleEdit = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    dispatch(activateListEditMode(dropDownProperties.id));
    dispatch(deactivateDropDown());
    dispatch(setShowModal("editList"));
  };

  const handleDelete = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    dispatch(setShowModal("deleteList"));
  };

  const handleClose = (e: React.MouseEvent<HTMLElement>) => {
    dispatch(deactivateDropDown());
    dispatch(setShowModal());
  };

  return (
    <>
      <S.Backdrop onClick={handleClose}>
        <S.DropDownList
          style={{
            left: `${dropDownProperties.x}px`,
            top: `${dropDownProperties.y}px`,
          }}
        >
          <S.ListItem
            className="border-b border-main-300 "
            onClick={handleEdit}
          >
            edit
          </S.ListItem>
          <S.ListItem onClick={handleDelete}>delete</S.ListItem>
        </S.DropDownList>
      </S.Backdrop>
    </>
  );
};

export default DropDownMenu;
