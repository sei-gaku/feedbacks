import { ClientContext, GraphQLClient } from "graphql-hooks";
import { mount, route } from "navi";
import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-navi";

import Employees from "./pages/Employees";
import Home from "./pages/Home";

import "antd/dist/antd.css";
import "./index.css";

const client = new GraphQLClient({
  url: "http://localhost:8080/graphql",
});

const routes = mount({
  "/": route({
    title: "Feedbacks - Home",
    view: <Home />,
  }),
  "/employees": route({
    title: "Feedbacks - Employees",
    view: <Employees />,
  }),
});

ReactDOM.render(
  <ClientContext.Provider value={client}>
    <Router routes={routes} />
  </ClientContext.Provider>,
  document.getElementById("root"),
);
