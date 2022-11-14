import { useAppSelector } from "store/hooks";
import { selectShowModal } from "features/app/appSlice";

import ListAdd from "components/organisms/Modals/ListAdd/ListAdd";
import ListEdit from "./ListEdit/ListEdit";
import DeleteModal from "./DeleteModal/DeleteModal";
import ChangeEmail from "./ChangeEmail/ChangeEmail";
import DeleteUserModal from "./DeleteUserModal/DeleteUserModal";
import ChangePassword from "./ChangePassword/ChangePassword";

const Modals = () => {
  const showModal = useAppSelector(selectShowModal);

  switch (showModal) {
    case "createList":
      return <ListAdd />;
    case "editList":
      return <ListEdit />;
    case "deleteList":
      return <DeleteModal />;
    case "changeEmail":
      return <ChangeEmail />;
    case "changePassword":
      return <ChangePassword />;
    case "deleteUser":
      return <DeleteUserModal />;
    default:
      return null;
  }
};

export default Modals;
