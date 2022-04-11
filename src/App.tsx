import { useAppSelector } from "store/hooks";
import { selectErrorMessage } from "features/todo/todoSlice";

import "./App.scss";
import Home from "views/Home/HomePage/Home";
import ErrorBanner from "components/ErrorBanner/ErrorBanner";

function App() {
  const errorMessage = useAppSelector(selectErrorMessage);

  return (
    <div className="App">
      {errorMessage && <ErrorBanner />}

      <div className="background-img"></div>
      <Home />
    </div>
  );
}

export default App;
