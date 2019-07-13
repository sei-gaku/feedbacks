import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import ErrorBoundary from "./components/ErrorBoundary";
import { Provider as StorageProvider } from "./contexts/Storage";

import "antd/dist/antd.css";
import "./index.scss";

ReactDOM.render(
  <ErrorBoundary>
    <StorageProvider>
      <App />
    </StorageProvider>
  </ErrorBoundary>,
  document.getElementById("root"),
);
