import { Context, useContext } from "react";

export interface StateContextValue<Action, State> {
  dispatch: (action: Action) => void;
  state: State;
}

// This hook is a dumb hook allowing for a bit more of type safety,
// since the contexts have to be compliant with the interface above.
export default <Action, State>(
  context: Context<StateContextValue<Action, State>>,
) => useContext(context);
