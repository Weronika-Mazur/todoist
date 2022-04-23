import { useAppDispatch, useAppSelector } from "store/hooks";
import { ListColors, ListContent } from "types/type";

import ListCreator from "../ListCreator/ListCreator";
import {
  setShowModal,
  updateList,
  selectListEditMode,
  deactivateListEditMode,
} from "features/list/listSlice";

const ListEdit = () => {
  const dispatch = useAppDispatch();
  const editMode = useAppSelector(selectListEditMode);

  const handleCloseModal = () => {
    dispatch(deactivateListEditMode());
    dispatch(setShowModal());
  };

  const editCurrentList = async (newName: string, newColor: ListColors) => {
    try {
      if (newName !== "") {
        const newList: ListContent = {
          name: newName,
          color: newColor,
        };

        const data = await dispatch(updateList(newList, editMode.id));
        if (data) {
          handleCloseModal();
        }
      }
    } catch (err) {}
  };

  return (
    <ListCreator
      name={editMode.name}
      defaultColor={editMode.color}
      handleCloseModal={handleCloseModal}
      onConfirm={editCurrentList}
    />
  );
};

export default ListEdit;
