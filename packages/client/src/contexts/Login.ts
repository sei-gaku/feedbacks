import React, { Reducer } from "react";

import { StateContextValue } from "../hooks/useStateContext";
import createProvider from "./createProvider";

// For each context we first define the state
interface State {
  form: {
    email: string;
    password: string;
  };
  loading: boolean;
}

// And a initial state value
const initialState: State = {
  form: { email: "", password: "" },
  loading: false,
};

// Then the action
type Action =
  | { type: "setLoading"; payload: boolean }
  | {
      type: "setValue";
      payload: {
        key: keyof State["form"];
        value: State["form"][keyof State["form"]];
      };
    };

// A reducer
const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case "setLoading": {
      return { ...state, loading: action.payload };
    }

    case "setValue": {
      return {
        ...state,
        form: { ...state.form, [action.payload.key]: action.payload.value },
      };
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
