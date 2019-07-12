import { useMutation } from "graphql-hooks";
import { loader } from "graphql.macro";
import React from "react";

import { LoginMutation } from "../generated/graphql";

const mutation = loader("./Login.graphql").loc!.source.body;

const Home: React.FC = () => {
  const [login, response] = useMutation<LoginMutation>(mutation);

  React.useEffect(() => {
    login();
  }, []);

  return (
    <div>
      {response.loading || !response.data ? (
        <div>Loading...</div>
      ) : (
        <div>Fetched token: {response.data.login.token}</div>
      )}
    </div>
  );
};

export default Home;
