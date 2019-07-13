import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { Provider as StorageProvider } from "./contexts/Storage";

import "antd/dist/antd.css";
import "./index.scss";

ReactDOM.render(
  <StorageProvider>
    <App />
  </StorageProvider>,
  document.getElementById("root"),
);
