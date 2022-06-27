import { useNavigate } from "react-router-dom";

import { Priority } from "types/type";
import { getPriorityArray } from "utils/helpers";

import * as S from "./styles";

const PriorityList = () => {
  const navigate = useNavigate();

  const priorityArray = getPriorityArray();

  const handleFilterBy = (priority: Priority) => {
    const searchParams = new URLSearchParams({ priority: priority.toString() });
    const url = `/home/filtered/?${searchParams}`;
    navigate(url);
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
