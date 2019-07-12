import React from "react";

import { StateContextValue } from "../hooks/useStateContext";

// Handy Provider creator
export default <Action, State>(
  Context: React.Context<StateContextValue<Action, State>>,
  reducer: (prevState: State, action: Action) => State,
  initialState: State,
): React.FC => ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <Context.Provider value={{ dispatch, state }}>{children}</Context.Provider>
  );
};
