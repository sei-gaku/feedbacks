import {
  ClientContext,
  UseClientRequestOptions,
  useMutation,
} from "graphql-hooks";
import { useContext } from "react";

import useLocalStorage from "./useLocalStorage";

// This hook will automatically inject the token into the headers

export default <ResponseData>(
  mutation: string,
  options?: UseClientRequestOptions,
) => {
  const { storageValue: storageTokenValue } = useLocalStorage("token");
  const client = useContext(ClientContext);

  if (storageTokenValue) {
    client.setHeader("Authorization", `Bearer ${storageTokenValue}`);
  }

  return useMutation<ResponseData>(mutation, options);
};
