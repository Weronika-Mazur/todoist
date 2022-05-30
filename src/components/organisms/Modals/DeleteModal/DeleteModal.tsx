import { useAppDispatch, useAppSelector } from "store/hooks";
import { deactivateListEditMode, setShowModal } from "features/list/listSlice";

import Button from "components/atoms/Button/Button";
import * as S from "./styles";
import { deleteList } from "features/list/listSlice";
import CancelButton from "components/atoms/CancelButton/CancelButton";
import { selectSelectedList } from "features/list/listSlice";

const DeleteModal = () => {
  const dispatch = useAppDispatch();
  const { id } = useAppSelector(selectSelectedList);

  const handleCancel = () => {
    dispatch(deactivateListEditMode());
    dispatch(setShowModal());
  };

  const handleConfirm = () => {
    dispatch(deleteList(id));
    handleCancel();
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
