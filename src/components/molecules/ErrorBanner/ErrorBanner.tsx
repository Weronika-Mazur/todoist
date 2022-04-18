import { useAppDispatch, useAppSelector } from "store/hooks";
import { setErrorMessage, selectErrorMessage } from "features/todo/todoSlice";

import CrossIcon from "assets/CrossIcon";
import { Banner, BannerContainer, CrossButton, ErrorContent } from "./styles";

const ErrorBar = () => {
  const dispatch = useAppDispatch();
  const errorMessage = `Error occurred while ${useAppSelector(
    selectErrorMessage
  )}!`;

  function handleCloseBanner() {
    dispatch(setErrorMessage());
  }

  return (
    <Banner>
      <BannerContainer>
        <ErrorContent>{errorMessage}</ErrorContent>
        <CrossButton onClick={handleCloseBanner}>
          <CrossIcon className="fill-slate-100" />
        </CrossButton>
      </BannerContainer>
    </Banner>
  );
};

export default ErrorBar;
