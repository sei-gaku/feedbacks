import { ClientContext, GraphQLClient } from "graphql-hooks";
import { map, mount, redirect, route } from "navi";
import React from "react";
import { Router, View } from "react-navi";

import { Provider as EmployeesProvider } from "./contexts/Employees";
import { Provider as LoginProvider } from "./contexts/Login";
import useLocalStorage from "./hooks/useLocalStorage";
import Employees from "./pages/Employees";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Reviews from "./pages/Reviews";

import "antd/dist/antd.css";
import "./index.scss";

const client = new GraphQLClient({
  url: "http://localhost:8080/graphql",
});

// tslint:disable: object-literal-sort-keys
const routes = mount({
  "/": map((_, context) => {
    // TODO: Make this part a bit more type safe
    switch ((context as any).role) {
      case "admin": {
        return redirect("/employees");
      }

      case "employees": {
        return redirect("/reviews/written-by-me");
      }

      default: {
        return redirect("/login");
      }
    }
  }),
  "/login": map((_, context) =>
    (context as any).token
      ? redirect("/")
      : route({
          title: "Feedbacks - Log in",
          view: (
            <LoginProvider>
              <Login />
            </LoginProvider>
          ),
        }),
  ),
  "/logout": route({
    title: "Feedbacks - Logging out...",
    view: <Logout />,
  }),
  "/employees": map((_, context) =>
    (context as any).role !== "admin"
      ? redirect("/")
      : route({
          title: "Feedbacks - Employees",
          view: (
            <EmployeesProvider>
              <Employees />
            </EmployeesProvider>
          ),
        }),
  ),
  "/reviews/written-by-me": map((_, context) =>
    !(context as any).token
      ? redirect("/login")
      : route({
          title: "Feedbacks - Reviews written by me",
          view: <Reviews />,
        }),
  ),
  "/reviews/about-me": map((_, context) =>
    !(context as any).token
      ? redirect("/login")
      : route({
          title: "Feedbacks - Reviews about me",
          view: <Reviews />,
        }),
  ),
});

const App: React.FC = () => {
  const { storageValue: storageTokenValue } = useLocalStorage("token");
  const { storageValue: storageRoleValue } = useLocalStorage("role");

  return (
    <ClientContext.Provider value={client}>
      <Router
        routes={routes}
        context={{ token: storageTokenValue, role: storageRoleValue }}
      >
        <View />
      </Router>
    </ClientContext.Provider>
  );
};

export default App;
