import { useEffect } from "react";
import disableScroll from "disable-scroll";

import { Priority } from "types/type";

import * as S from "./styles";
import { getPriorityArray } from "utils/helpers";

interface PriorityDropDownProps {
  handleSetPriority: (priority?: Priority) => void;
}

const PriorityDropDown = ({ handleSetPriority }: PriorityDropDownProps) => {
  const priorityArray = getPriorityArray();

  useEffect(() => {
    disableScroll.on();
    return () => {
      disableScroll.off();
    };
  }, []);

  return (
    <>
      {priorityArray.map((priority) => (
        <S.ListItem
          onClick={() => {
            handleSetPriority(priority);
          }}
          key={priority}
        >
          <S.TaskPriorityIcon $color={priority} />
          <S.ListItemText>{`Priority ${priority}`}</S.ListItemText>
        </S.ListItem>
      ))}
    </>
  );
};

export default PriorityDropDown;
