import DotIcon from "assets/DotIcon";
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
          <DotIcon className="w-8 h-8 hover:scale-110 cursor-pointer" />
        </S.ColorContainer>
      ))}
    </S.ColorPicker>
  );
};

export default ColorPick;
