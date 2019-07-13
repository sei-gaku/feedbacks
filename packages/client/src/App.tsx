import { ClientContext, GraphQLClient } from "graphql-hooks";
import { map, mount, redirect, route } from "navi";
import React from "react";
import { Router, View } from "react-navi";

import { Provider as EmployeesProvider } from "./contexts/Employees";
import { Provider as LoginProvider } from "./contexts/Login";
import { Provider as ReviewsProvider } from "./contexts/Reviews";
import useLocalStorage from "./hooks/useLocalStorage";
import Employees from "./pages/Employees/Employees";
import Login from "./pages/Login/Login";
import Logout from "./pages/Logout/Logout";
import Reviews from "./pages/Reviews/Reviews";

import "antd/dist/antd.css";
import "./index.scss";

const client = new GraphQLClient({
  url: "http://localhost:8080/graphql",
});

// tslint:disable: object-literal-sort-keys
const routes = mount({
  "/": map((_, context: any) => {
    // TODO: Make this part a bit more type safe
    switch (context.role) {
      case "admin": {
        return redirect("/employees");
      }

      case "employee": {
        return redirect("/reviews/written-by-me");
      }

      default: {
        return redirect("/login");
      }
    }
  }),
  "/login": map((_, context: any) =>
    context.token
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
  "/employees": map((_, context: any) =>
    context.role !== "admin"
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
  // TODO: Refactor these routes
  "/reviews/about-me": map((_, context: any) => {
    const id = +context.id;

    return isNaN(id) || !context.token
      ? redirect("/login")
      : route({
          title: "Feedbacks - Reviews",
          view: (
            <ReviewsProvider>
              <Reviews id={id} type="about" />
            </ReviewsProvider>
          ),
        });
  }),
  "/reviews/written-by-me": map((_, context: any) => {
    const id = +context.id;

    return isNaN(id) || !context.token
      ? redirect("/login")
      : route({
          title: "Feedbacks - Reviews",
          view: (
            <ReviewsProvider>
              <Reviews id={id} type="written-by" />
            </ReviewsProvider>
          ),
        });
  }),
  "/reviews/about/:id": map((req, context: any) => {
    const id = +req.params.id;

    if (isNaN(id)) {
      return redirect("/");
    }

    return !context.token
      ? redirect("/login")
      : route({
          title: "Feedbacks - Reviews",
          view: (
            <ReviewsProvider>
              <Reviews id={id} type="about" />
            </ReviewsProvider>
          ),
        });
  }),
  "/reviews/written-by/:id": map((req, context: any) => {
    const id = +req.params.id;

    if (isNaN(id)) {
      return redirect("/");
    }

    return !context.token
      ? redirect("/login")
      : route({
          title: "Feedbacks - Reviews",
          view: (
            <ReviewsProvider>
              <Reviews id={id} type="written-by" />
            </ReviewsProvider>
          ),
        });
  }),
});

const App: React.FC = () => {
  // TODO: Merge these values into one
  const { storageValue: storageTokenValue } = useLocalStorage("token");
  const { storageValue: storageRoleValue } = useLocalStorage("role");
  const { storageValue: storageIdValue } = useLocalStorage("id");

  return (
    <ClientContext.Provider value={client}>
      <Router
        routes={routes}
        context={{
          id: storageIdValue,
          role: storageRoleValue,
          token: storageTokenValue,
        }}
      >
        <View />
      </Router>
    </ClientContext.Provider>
  );
};

export default App;
