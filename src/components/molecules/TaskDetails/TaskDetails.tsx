import DropDown from "components/molecules/DropDown/DropDown";
import DateDropDown from "components/organisms/DropDowns/DateDropDown/DateDropDown";
import TagDropDown from "components/organisms/DropDowns/TagDropDown/TagDropDown";
import PriorityDropDown from "components/organisms/DropDowns/PriorityDropDown/PriorityDropDown";

import * as S from "./styles";
import { Priority, Tag } from "types/type";
import { getDateString } from "utils/helpers";

interface TaskDetailsProps {
  date?: Date;
  taskTags: Tag[];
  priority?: Priority;
  handleSetDate: (newDate?: Date) => void;
  handleSetPriority: (priority?: Priority) => void;
  handleSetTaskTags: (newSet: Tag[]) => void;
}

const TaskDetails = ({
  date,
  taskTags,
  priority,
  handleSetDate,
  handleSetPriority,
  handleSetTaskTags,
}: TaskDetailsProps) => {
  const handleDeleteTaskTag = (tag: Tag) => {
    handleSetTaskTags(taskTags.filter((item) => item.tagId !== tag.tagId));
  };

  const schedule = getDateString(date) ?? "Not scheduled";

  const priorityText =
    priority !== Priority.P1 ? `Priority ${priority}` : "No priority";

  return (
    <S.TaskDetailsContainer>
      <S.Details>
        <DropDown
          dropDown={<PriorityDropDown handleSetPriority={handleSetPriority} />}
          placement="bottom"
        >
          <S.DetailsButton>
            <S.TaskPriorityIcon $color={priority} />
            <S.DetailsText $isSet={priority !== Priority.P1}>
              {priorityText}
            </S.DetailsText>
          </S.DetailsButton>
        </DropDown>

        <DropDown
          dropDown={
            <DateDropDown setDate={handleSetDate} selectedDate={date} />
          }
          placement="bottom"
        >
          <S.DetailsButton>
            <S.TaskCalendarIcon />
            <S.DetailsText $isSet={date}>{schedule}</S.DetailsText>
          </S.DetailsButton>
        </DropDown>

        <DropDown
          dropDown={
            <TagDropDown
              handleSetTaskTags={handleSetTaskTags}
              taskTags={taskTags}
            />
          }
          placement="bottom"
        >
          <S.DetailsButton>
            <S.TaskTagIcon />
            <S.DetailsText $isSet={false}>Add tags</S.DetailsText>
          </S.DetailsButton>
        </DropDown>
      </S.Details>

      {taskTags.map((tag) => (
        <S.TagButton key={tag.tagId} onClick={() => handleDeleteTaskTag(tag)}>
          {tag.content}
        </S.TagButton>
      ))}
    </S.TaskDetailsContainer>
  );
};

export default TaskDetails;
