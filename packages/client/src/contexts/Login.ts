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
  | { type: "setEmailValue"; payload: string }
  | { type: "setPasswordValue"; payload: string }
  | { type: "setLoading"; payload: boolean };

// A reducer
const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case "setEmailValue": {
      return { ...state, form: { ...state.form, email: action.payload } };
    }

    case "setPasswordValue": {
      return { ...state, form: { ...state.form, password: action.payload } };
    }

    case "setLoading": {
      return { ...state, loading: action.payload };
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
