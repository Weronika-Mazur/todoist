import { setActiveListID } from "features/list/listSlice";
import { fetchTaskArray } from "features/todo/todoSlice";
import { useAppDispatch } from "store/hooks";
import { Priority } from "types/type";
import { getPriorityArray } from "utils/helpers";

import * as S from "./styles";

const PriorityList = () => {
  const dispatch = useAppDispatch();

  const priorityArray = getPriorityArray();

  const handleFilterBy = (priority: Priority) => {
    dispatch(fetchTaskArray(undefined, { priority }));
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
