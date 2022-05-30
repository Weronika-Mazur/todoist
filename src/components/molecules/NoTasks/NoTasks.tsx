import * as S from "./styles";

interface NoTasksProps {
  isLoading: boolean;
}

const NoTasks = ({ isLoading }: NoTasksProps) => {
  return !isLoading ? (
    <S.EmptyIllustrationContainer>
      <S.EmptyIllustration />
      <S.NotFoundText>No tasks found</S.NotFoundText>
    </S.EmptyIllustrationContainer>
  ) : null;
};

export default NoTasks;
