import { useAppDispatch } from "store/hooks";
import { useNavigate } from "react-router-dom";

import { setShowModal } from "features/app/appSlice";

import Button from "components/atoms/Button/Button";

import * as S from "./styles";
import { useState } from "react";
import { useDeleteUser } from "lib/auth";

const DeleteUserModal = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const { deleteUser } = useDeleteUser();

  const handleCancel = () => {
    dispatch(setShowModal());
  };

  const handleConfirm = async () => {
    deleteUser(password, {
      onSuccess: () => {
        dispatch(setShowModal());
        navigate("/login");
      },
    });
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  return (
    <S.Backdrop>
      <S.Card>
        <S.Title>Delete user</S.Title>
        <section className="flex gap-1 flex-col py-4 px-8 ">
          <S.Label htmlFor="password">Password:</S.Label>
          <S.InputContainer>
            <S.EditInput
              type="password"
              id="password"
              value={password}
              onChange={handleTextChange}
              required
            />
          </S.InputContainer>

          <S.Text>
            Deleting your account is permanent. All your data will be wiped out
            immediately.
          </S.Text>
        </section>
        <S.ButtonContainer>
          <Button text="confirm" onClick={handleConfirm} />
          <Button variant="outlined" text="cancel" onClick={handleCancel} />
        </S.ButtonContainer>
      </S.Card>
    </S.Backdrop>
  );
};

export default DeleteUserModal;
