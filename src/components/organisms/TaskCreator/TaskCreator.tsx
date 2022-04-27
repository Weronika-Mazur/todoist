import { useAppSelector } from "store/hooks";
import { selectIsLoading } from "features/todo/todoSlice";

import BusyIcon from "assets/BusyIcon";
import * as S from "./styles";
import TaskCreatorContainer from "./TaskCreatorContainer";

const TaskCreator = () => {
  const isLoading = useAppSelector(selectIsLoading);

  return !isLoading ? (
    <TaskCreatorContainer />
  ) : (
    <S.BusyAnimation>
      <BusyIcon />
    </S.BusyAnimation>
  );
};

export default TaskCreator;
