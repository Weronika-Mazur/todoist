import * as S from "./styles";
import { Colors } from "utils/constants";
import { ListColors } from "types/type";

interface ColorPickProps {
  handleChangeColor: (color: ListColors) => void;
}

const ColorPick = ({ handleChangeColor }: ColorPickProps) => {
  return (
    <S.ColorPicker>
      <S.Title>Color: </S.Title>

      {Object.entries(Colors).map(([value, fill]) => (
        <S.ColorContainer
          $fill={fill}
          key={value}
          onClick={() => {
            handleChangeColor(value as ListColors);
          }}
        >
          <S.ColorIcon />
        </S.ColorContainer>
      ))}
    </S.ColorPicker>
  );
};

export default ColorPick;
