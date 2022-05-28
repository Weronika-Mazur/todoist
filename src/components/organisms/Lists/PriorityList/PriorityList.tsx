import { setActiveListID } from "features/list/listSlice";
import { fetchFilteredTaskArray } from "features/todo/todoSlice";
import { useAppDispatch } from "store/hooks";
import { Priority } from "types/type";

import * as S from "./styles";

const PriorityList = () => {
  const dispatch = useAppDispatch();

  const priorityArray = (
    Object.keys(Priority).filter((v) =>
      isNaN(Number(v))
    ) as (keyof typeof Priority)[]
  ).map((key) => {
    return Priority[key];
  });

  const handleFilterBy = (priority: Priority) => {
    dispatch(fetchFilteredTaskArray(undefined, { priority }));
    dispatch(setActiveListID("Filtered"));
  };

  return (
    <section>
      <S.PriorityHeader>Priorities</S.PriorityHeader>
      <S.PriorityList>
        {priorityArray.map((priority) => (
          <S.ListItem key={priority}>
            <S.TaskPriorityIcon $color={priority} />
            <S.ListItemText
              onClick={() => handleFilterBy(priority)}
            >{`Priority ${priority}`}</S.ListItemText>
          </S.ListItem>
        ))}
      </S.PriorityList>
    </section>
  );
};

export default PriorityList;
