import { useAppDispatch, useAppSelector } from "store/hooks";
import { useMatch, useNavigate } from "react-router-dom";

import Button from "components/atoms/Button/Button";

import * as S from "./styles";
import { useDeleteList } from "lib/lists";
import { setShowModal } from "features/app/appSlice";
import {
  deactivateListEditMode,
  selectSelectedList,
} from "features/list/listSlice";

const DeleteModal = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useAppSelector(selectSelectedList);
  const { deleteList } = useDeleteList();

  const match = useMatch(`/home/${id}`);

  const handleCancel = () => {
    dispatch(deactivateListEditMode());
    dispatch(setShowModal());
  };

  const handleConfirm = async () => {
    deleteList(id, {
      onSuccess: () => {
        handleCancel();
        match && navigate("/home/");
      },
    });
  };

  return (
    <S.Backdrop>
      <S.Card>
        <S.Title>Are you sure you want to delete this list?</S.Title>
        <S.ButtonContainer>
          <Button text="confirm" onClick={handleConfirm} />
          <Button variant="outlined" text="cancel" onClick={handleCancel} />
        </S.ButtonContainer>
      </S.Card>
    </S.Backdrop>
  );
};

export default DeleteModal;
