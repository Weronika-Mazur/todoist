import { useAppSelector } from "store/hooks";
import { selectShowModal } from "features/app/appSlice";

import ListAdd from "components/organisms/Modals/ListAdd/ListAdd";
import ListEdit from "./ListEdit/ListEdit";
import DeleteModal from "./DeleteModal/DeleteModal";
import ChangeEmail from "./ChangeEmail/ChangeEmail";
import DeleteUserModal from "./DeleteUserModal/DeleteUserModal";
import ChangePassword from "./ChangePassword/ChangePassword";
import { Modal } from "types/type";

const Modals = () => {
  const showModal = useAppSelector(selectShowModal);

  switch (showModal) {
    case Modal.CreateList:
      return <ListAdd />;
    case Modal.EditList:
      return <ListEdit />;
    case Modal.DeleteList:
      return <DeleteModal />;
    case Modal.ChangeEmail:
      return <ChangeEmail />;
    case Modal.ChangePassword:
      return <ChangePassword />;
    case Modal.DeleteUser:
      return <DeleteUserModal />;
    default:
      return null;
  }
};

export default Modals;
