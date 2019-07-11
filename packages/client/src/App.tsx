import { useMutation } from "graphql-hooks";
import { loader } from "graphql.macro";
import React from "react";

import { LoginMutation } from "./generated/graphql";

import "./App.css";

const mutation = loader("./Login.graphql").loc!.source.body;

const App: React.FC = () => {
  const [login, response] = useMutation<LoginMutation>(mutation);

  React.useEffect(() => {
    login();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {response.loading || !response.data ? (
          <div>Loading...</div>
        ) : (
          <div>Fetched token: {response.data.login.token}</div>
        )}
      </header>
    </div>
  );
};

export default App;
