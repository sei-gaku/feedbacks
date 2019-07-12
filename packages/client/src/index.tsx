import { ClientContext, GraphQLClient } from "graphql-hooks";
import { mount, route } from "navi";
import React from "react";
import ReactDOM from "react-dom";
import { Router, View } from "react-navi";

import Layout from "./components/Layout";
import Employees from "./pages/Employees";
import Home from "./pages/Home";
import Reviews from "./pages/Reviews";

import "antd/dist/antd.css";
import "./index.scss";

const client = new GraphQLClient({
  url: "http://localhost:8080/graphql",
});

// tslint:disable: object-literal-sort-keys
const routes = mount({
  "/": route({
    title: "Feedbacks - Home",
    view: <Home />,
  }),
  "/login": route({
    title: "Feedbacks - Log in",
    // FIXME: Use proper page
    view: <Home />,
  }),
  "/logout": route({
    title: "Feedbacks - Logging out...",
    // FIXME: Use proper page
    view: <Home />,
  }),
  "/employees": route({
    title: "Feedbacks - Employees",
    view: <Employees />,
  }),
  "/reviews/written-by-me": route({
    title: "Feedbacks - Reviews written by me",
    view: <Reviews />,
  }),
  "/reviews/about-me": route({
    title: "Feedbacks - Reviews about me",
    view: <Reviews />,
  }),
});

ReactDOM.render(
  <ClientContext.Provider value={client}>
    <Router routes={routes}>
      <Layout>
        <View />
      </Layout>
    </Router>
  </ClientContext.Provider>,
  document.getElementById("root"),
);
