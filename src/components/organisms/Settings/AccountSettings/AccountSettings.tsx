import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppDispatch } from "store/hooks";

import Button from "components/atoms/Button/Button";

import * as S from "./styles";
import { useRemoveProfilePicture, useUpdateUser, useUser } from "lib/auth";
import { setShowModal } from "features/app/appSlice";

const AccountSettings = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user } = useUser();
  const username = user?.userName ?? "";

  const [file, setFile] = useState<File | undefined>();
  const [newUsername, setNewUsername] = useState(username);

  const { updateUser } = useUpdateUser();
  const { removeProfilePicture } = useRemoveProfilePicture();

  const handleChooseFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files) {
      setFile(files[0]);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUsername(e.target.value);
  };

  const handleShowChangeEmail = () => {
    dispatch(setShowModal("changeEmail"));
  };
  const handleShowChangePassword = () => {
    dispatch(setShowModal("changePassword"));
  };

  const handleShowDeleteUser = () => {
    dispatch(setShowModal("deleteUser"));
  };

  const handleRemoveProfilePicture = () => {
    removeProfilePicture(undefined, {
      onSuccess: () => {
        setFile(undefined);
      },
    });
  };

  const handleCancel = () => {
    setFile(undefined);
    setNewUsername(username);
  };

  const handleUpdate = async () => {
    const trimmedNewUsername = newUsername.trim();
    if (trimmedNewUsername !== username || file) {
      const formData = new FormData();

      trimmedNewUsername !== username &&
        formData.append("newUsername", trimmedNewUsername);

      file && formData.append("profilePicture", file);
      updateUser(formData, {
        onSuccess: () => {
          navigate("/");
        },
      });
    }
  };

  return (
    <>
      <S.SettingsHeader>Account</S.SettingsHeader>

      <S.SettingsSection>
        <div>
          <S.SettingTitle>Profile picture</S.SettingTitle>

          {file ? (
            <S.NewUserPicture
              src={URL.createObjectURL(file)}
              alt="user profile"
            />
          ) : (
            <S.LightUserIcon />
          )}

          <div className="flex gap-3.5">
            <S.ProfileEditButton onChange={handleChooseFile} name="avatar" />
            {user?.avatarUrl && (
              <Button
                variant="danger"
                text="remove"
                onClick={handleRemoveProfilePicture}
              />
            )}
          </div>
        </div>

        <div>
          <S.SettingTitle>Username</S.SettingTitle>
          <S.InputContainer>
            <S.EditInput
              type="text"
              value={newUsername}
              maxLength={200}
              onChange={handleTextChange}
            />
          </S.InputContainer>
        </div>

        <div>
          <S.SettingTitle>Email</S.SettingTitle>
          <S.Text>{user?.email}</S.Text>
          <Button
            variant="outlined"
            text="change"
            onClick={handleShowChangeEmail}
          />
        </div>

        <div>
          <S.SettingTitle>Password</S.SettingTitle>
          <Button
            variant="outlined"
            text="change"
            onClick={handleShowChangePassword}
          />
        </div>
      </S.SettingsSection>

      <S.SettingsSection>
        <S.SettingTitle>Delete Account</S.SettingTitle>
        <S.Text>
          This will delete all of your data including tasks, lists, and more. It
          cannot be undone
        </S.Text>
        <S.DeleteButton
          text="delete account"
          variant="danger"
          onClick={handleShowDeleteUser}
        />
      </S.SettingsSection>

      <S.SettingsSection>
        <div className="flex justify-end mt-5 gap-4">
          <Button text="update profile" onClick={handleUpdate} />
          <Button variant="outlined" text="cancel" onClick={handleCancel} />
        </div>
      </S.SettingsSection>
    </>
  );
};

export default AccountSettings;
