import { createRoot } from "react-dom/client";
import App from "./App";
import { store } from "store/store";
import { Provider } from "react-redux";

import "./index.scss";
import "animate.css";
import { StrictMode } from "react";

const container = document.getElementById("root") as HTMLDivElement;
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>
);
