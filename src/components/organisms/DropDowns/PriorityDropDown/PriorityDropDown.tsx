import { Priority } from "types/type";

import * as S from "./styles";

interface PriorityDropDownProps {
  handleSetPriority: (priority?: Priority) => void;
}

const PriorityDropDown = ({ handleSetPriority }: PriorityDropDownProps) => {
  const priorityArray = (
    Object.keys(Priority).filter((v) =>
      isNaN(Number(v))
    ) as (keyof typeof Priority)[]
  ).map((key) => {
    return Priority[key];
  });

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
