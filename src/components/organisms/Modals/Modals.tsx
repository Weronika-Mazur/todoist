import { useAppSelector } from "store/hooks";
import { selectShowModal } from "features/list/listSlice";

import ListAdd from "components/organisms/ListAdd/ListAdd";
import ListEdit from "../ListEdit/ListEdit";
import DropDownMenu from "../DropDownMenu/DropDownMenu";
import DeleteModal from "../DeleteModal/DeleteModal";

const Modals = () => {
  const showModal = useAppSelector(selectShowModal);

  switch (showModal) {
    case "createList":
      return <ListAdd />;
    case "editList":
      return <ListEdit />;
    case "deleteList":
      return <DeleteModal />;
    case "dropDown":
      return <DropDownMenu />;
    default:
      return null;
  }
};

export default Modals;
