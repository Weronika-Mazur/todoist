import { useAppDispatch } from "store/hooks";
import { useNavigate } from "react-router-dom";

import ListCreator from "../../ListCreator/ListCreator";

import { setShowModal } from "features/app/appSlice";
import { useAddList } from "lib/lists";
import { List, ListColors, ListContent } from "types/list";

const ListAdd = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { addList } = useAddList();

  const handleCloseModal = () => {
    dispatch(setShowModal());
  };

  const addNewList = async (newName: string, newColor: ListColors) => {
    if (newName !== "") {
      const newList: ListContent = {
        name: newName,
        color: newColor,
      };

      addList(newList, {
        onSuccess: (data: List) => {
          handleCloseModal();
          navigate(`/home/${data.listId}`);
        },
      });
    }
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
