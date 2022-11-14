import { useAppDispatch, useAppSelector } from "store/hooks";
import { setErrorMessage, selectErrorMessage } from "features/app/appSlice";

import * as S from "./styles";

const ErrorBar = () => {
  const dispatch = useAppDispatch();
  const errorMessage = `Error occurred while ${useAppSelector(
    selectErrorMessage
  )}!`;

  function handleCloseBanner() {
    dispatch(setErrorMessage());
  }

  return (
    <S.Banner>
      <S.BannerContainer>
        <S.ErrorContent>{errorMessage}</S.ErrorContent>
        <S.CrossButton onClick={handleCloseBanner}>
          <S.WhiteCrossIcon />
        </S.CrossButton>
      </S.BannerContainer>
    </S.Banner>
  );
};

export default ErrorBar;
