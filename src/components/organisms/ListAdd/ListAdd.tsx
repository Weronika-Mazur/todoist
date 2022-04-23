import { useAppDispatch } from "store/hooks";
import { ListColors, ListContent } from "types/type";

import ListCreator from "../ListCreator/ListCreator";
import { addList, setShowModal } from "../../../features/list/listSlice";

const ListAdd = () => {
  const dispatch = useAppDispatch();

  const handleCloseModal = () => {
    dispatch(setShowModal());
  };

  const addNewList = async (newName: string, newColor: ListColors) => {
    try {
      if (newName !== "") {
        const newList: ListContent = {
          name: newName,
          color: newColor,
        };

        const data = await dispatch(addList(newList));
        if (data) {
          handleCloseModal();
        }
      }
    } catch (err) {}
  };

  return (
    <ListCreator
      title="Create a new list"
      handleCloseModal={handleCloseModal}
      onConfirm={addNewList}
    />
  );
};

export default ListAdd;
