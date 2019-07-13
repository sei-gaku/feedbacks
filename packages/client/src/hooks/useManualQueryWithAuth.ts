import {
  ClientContext,
  UseClientRequestOptions,
  useManualQuery,
} from "graphql-hooks";
import { useContext } from "react";

import useLocalStorage from "./useLocalStorage";

// This hook will automatically inject the token into the headers

export default <ResponseData>(
  query: string,
  options?: UseClientRequestOptions,
) => {
  const { storageValue: storageTokenValue } = useLocalStorage("token");
  const client = useContext(ClientContext);

  if (storageTokenValue) {
    client.setHeader("Authorization", `Bearer ${storageTokenValue}`);
  }

  return useManualQuery<ResponseData>(query, options);
};
