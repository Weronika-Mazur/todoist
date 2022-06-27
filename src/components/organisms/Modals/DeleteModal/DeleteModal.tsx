import { useAppDispatch, useAppSelector } from "store/hooks";
import { useMatch, useNavigate } from "react-router-dom";

import { deactivateListEditMode, setShowModal } from "features/list/listSlice";
import { selectSelectedList, deleteList } from "features/list/listSlice";

import Button from "components/atoms/Button/Button";
import CancelButton from "components/atoms/CancelButton/CancelButton";
import * as S from "./styles";

const DeleteModal = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useAppSelector(selectSelectedList);

  const match = useMatch(`/home/${id}`);

  const handleCancel = () => {
    dispatch(deactivateListEditMode());
    dispatch(setShowModal());
  };

  const handleConfirm = async () => {
    const data = await dispatch(deleteList(id));
    if (data) {
      handleCancel();
      match && navigate("/home/");
    }
  };

  return (
    <S.Backdrop>
      <S.Card>
        <S.Title>Are you sure you want to delete this list?</S.Title>
        <S.ButtonContainer>
          <Button text="confirm" onClick={handleConfirm} />
          <CancelButton onClick={handleCancel} />
        </S.ButtonContainer>
      </S.Card>
    </S.Backdrop>
  );
};

export default DeleteModal;
