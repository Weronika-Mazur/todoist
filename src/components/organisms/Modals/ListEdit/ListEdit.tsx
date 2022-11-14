import { useAppDispatch, useAppSelector } from "store/hooks";

import ListCreator from "../../ListCreator/ListCreator";

import { useChangeList } from "lib/lists";
import { setShowModal } from "features/app/appSlice";
import {
  deactivateListEditMode,
  selectSelectedList,
} from "features/list/listSlice";
import { ListColors, ListContent } from "types/list";

const ListEdit = () => {
  const dispatch = useAppDispatch();
  const selectedList = useAppSelector(selectSelectedList);
  const { changeList } = useChangeList();

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

      changeList(
        { newList, listId: selectedList.id },
        {
          onSuccess: () => {
            handleCloseModal();
          },
        }
      );
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
