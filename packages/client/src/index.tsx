import { ClientContext, GraphQLClient } from "graphql-hooks";
import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

import "./index.css";

const client = new GraphQLClient({
  url: "http://localhost:8080/graphql",
});

ReactDOM.render(
  <ClientContext.Provider value={client}>
    <App />
  </ClientContext.Provider>,
  document.getElementById("root"),
);
