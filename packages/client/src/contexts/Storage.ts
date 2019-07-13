import React, { Reducer } from "react";

import { StateContextValue } from "../hooks/useStateContext";
import createProvider from "./createProvider";

// For each context we first define the state
type State = Record<string, string>;

// And a initial state value
const initialState: State = {};

// Then the action
type Action =
  | { type: "setValue"; payload: { key: string; value: string } }
  | { type: "clearValue"; payload: { key: string } };

// A reducer
const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case "setValue": {
      return { ...state, [action.payload.key]: action.payload.value };
    }

    case "clearValue": {
      const { [action.payload.key]: _, ...newState } = state;

      return newState;
    }

    default: {
      return state;
    }
  }
};

// And finally the pair Context/Provider
const Context = React.createContext<StateContextValue<Action, State>>({
  dispatch: () => undefined,
  state: initialState,
});

export const Provider = createProvider(Context, reducer, initialState);

export default Context;
