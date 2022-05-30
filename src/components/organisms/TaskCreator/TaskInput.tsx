import Button from "components/atoms/Button/Button";
import * as S from "./styles";

interface TaskInputProps {
  content: string;
  handleSetContent: (text: string) => void;
  handleAddTask: () => void;
}

const TaskInput = ({
  content,
  handleSetContent,
  handleAddTask,
}: TaskInputProps) => {
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    handleSetContent(e.target.value);

  return (
    <>
      <S.TaskCreatorContainer>
        <Button onClick={handleAddTask} text="add"></Button>
        <S.TaskCreatorInput
          type="text"
          placeholder="Create a new todo..."
          maxLength={200}
          value={content}
          onChange={handleTextChange}
        />
      </S.TaskCreatorContainer>
    </>
  );
};

export default TaskInput;
