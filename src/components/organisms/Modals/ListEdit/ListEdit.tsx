import { useAppDispatch, useAppSelector } from "store/hooks";
import { ListColors, ListContent } from "types/type";

import ListCreator from "../../ListCreator/ListCreator";
import {
  setShowModal,
  updateList,
  deactivateListEditMode,
  selectSelectedList,
} from "features/list/listSlice";

const ListEdit = () => {
  const dispatch = useAppDispatch();
  const selectedList = useAppSelector(selectSelectedList);

  const handleCloseModal = () => {
    dispatch(deactivateListEditMode());
    dispatch(setShowModal());
  };

  const editCurrentList = async (newName: string, newColor: ListColors) => {
    if (newName !== "") {
      const newList: ListContent = {
        name: newName,
        color: newColor,
      };

      const data = await dispatch(updateList(newList, selectedList.id));
      if (data) {
        handleCloseModal();
      }
    }
  };

  return (
    <ListCreator
      name={selectedList.name}
      defaultColor={selectedList.color}
      handleCloseModal={handleCloseModal}
      onConfirm={editCurrentList}
    />
  );
};

export default ListEdit;
