import { useAppSelector } from "store/hooks";
import { selectShowModal } from "features/list/listSlice";

import ListAdd from "components/organisms/Modals/ListAdd/ListAdd";
import ListEdit from "./ListEdit/ListEdit";
import DeleteModal from "./DeleteModal/DeleteModal";

const Modals = () => {
  const showModal = useAppSelector(selectShowModal);

  switch (showModal) {
    case "createList":
      return <ListAdd />;
    case "editList":
      return <ListEdit />;
    case "deleteList":
      return <DeleteModal />;
    default:
      return null;
  }
};

export default Modals;
