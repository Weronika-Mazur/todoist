import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useAppSelector } from "store/hooks";
import { selectErrorMessage } from "features/todo/todoSlice";

import "./App.scss";
import Home from "views/Home/Home";
import Login from "views/Login/Login";

import ErrorBanner from "components/molecules/ErrorBanner/ErrorBanner";

function App() {
  const errorMessage = useAppSelector(selectErrorMessage);

  return (
    <div className="App font-body text-main-100 font-medium text-base">
      {errorMessage && <ErrorBanner />}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
