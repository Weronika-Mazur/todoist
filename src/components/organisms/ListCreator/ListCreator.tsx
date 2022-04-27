import { useState } from "react";

import ColorPick from "components/molecules/ColorPick/ColorPick";
import Button from "components/atoms/Button/Button";
import DotIcon from "assets/DotIcon";
import * as S from "./styles";

import { ListColors } from "types/type";
import { Colors } from "utils/constants";
import CancelButton from "components/atoms/CancelButton/CancelButton";

interface ListCreatorProps {
  handleCloseModal: () => void;
  title?: string;
  defaultColor?: ListColors;
  onConfirm: (newName: string, newColor: ListColors) => void;
  name?: string;
}

const ListCreator = ({
  handleCloseModal,
  title,
  defaultColor = ListColors.green,
  onConfirm,
  name = "",
}: ListCreatorProps) => {
  const [currentColor, setCurrentColor] = useState(defaultColor);
  const [text, setText] = useState(name);

  const handleChangeColor = (color: ListColors) => {
    setCurrentColor(color);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setText(e.target.value);

  const handleCancel = () => {
    handleCloseModal();
  };

  const handleConfirm = () => {
    onConfirm(text, currentColor);
  };

  return (
    <S.Backdrop>
      <S.Card>
        <S.ListEditContainer>
          <S.Title>{title}</S.Title>
          <S.InputContainer>
            <DotIcon className={Colors[currentColor]} />
            <S.ListCreatorInput
              type="text"
              placeholder="Enter list name..."
              maxLength={50}
              value={text}
              onChange={handleTextChange}
            />
          </S.InputContainer>
          <ColorPick handleChangeColor={handleChangeColor} />
        </S.ListEditContainer>
        <S.ButtonContainer>
          <Button text="confirm" onClick={handleConfirm} />
          <CancelButton onClick={handleCancel} />
        </S.ButtonContainer>
      </S.Card>
    </S.Backdrop>
  );
};

export default ListCreator;
