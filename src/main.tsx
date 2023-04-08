import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import "../node_modules/normalize.css/normalize.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
