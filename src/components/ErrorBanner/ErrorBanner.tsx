import { useAppDispatch, useAppSelector } from "store/hooks";
import { setErrorMessage, selectErrorMessage } from "features/todo/todoSlice";

import CrossIcon from "assets/CrossIcon";
import "./ErrorBanner.scss";

function ErrorBar() {
  const dispatch = useAppDispatch();
  const errorMessage = `Error occurred while ${useAppSelector(
    selectErrorMessage
  )}!`;

  function handleCloseBanner() {
    dispatch(setErrorMessage());
  }

  return (
    <div className="error-banner">
      <div className="error-banner__container">
        <p className="error-banner__content">{errorMessage}</p>
        <button
          className="error-banner__cross-button"
          onClick={handleCloseBanner}
        >
          <CrossIcon />
        </button>
      </div>
    </div>
  );
}

export default ErrorBar;
