import * as S from "./styles";

const NoTasks = () => {
  return (
    <S.EmptyIllustrationContainer>
      <S.EmptyIllustration />
      <S.NotFoundText>No tasks found</S.NotFoundText>
    </S.EmptyIllustrationContainer>
  );
};

export default NoTasks;
