import { useAppDispatch, useAppSelector } from "store/hooks";
import { setErrorMessage, selectErrorMessage } from "features/todo/todoSlice";

import CrossIcon from "assets/CrossIcon";
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
          <CrossIcon className="fill-slate-100" />
        </S.CrossButton>
      </S.BannerContainer>
    </S.Banner>
  );
};

export default ErrorBar;
