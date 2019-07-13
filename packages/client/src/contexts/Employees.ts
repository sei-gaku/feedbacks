import React, { Reducer } from "react";

import { StateContextValue } from "../hooks/useStateContext";
import createProvider from "./createProvider";

type EmployeeModalMode = "create" | "edit";

interface EmployeeModal {
  employeeId: number | null;
  form: {
    bio?: string | null;
    email: string;
    firstName: string;
    isAdmin: boolean;
    lastName: string;
    password: string;
  };
  mode: EmployeeModalMode;
}

const initialEmployeeModalState: EmployeeModal = {
  employeeId: null,
  form: {
    bio: "",
    email: "",
    firstName: "",
    isAdmin: false,
    lastName: "",
    password: "",
  },
  mode: "create",
};

interface WarningModal {
  employeeId: number;
}

// For each context we first define the state
interface State {
  employeeModal: null | EmployeeModal;
  warningModal: null | WarningModal;
}

// And a initial state value
const initialState: State = {
  employeeModal: null,
  warningModal: null,
};

// Then the action
type Action =
  | {
      type: "openEmployeeModal";
      payload: {
        employeeId?: number;
        init?: Partial<EmployeeModal["form"]>;
        mode: "create" | "edit";
      };
    }
  | { type: "closeEmployeeModal" }
  | { type: "openWarninModal"; payload: { employeeId: number } }
  | { type: "closeWarningModal" }
  | {
      type: "setModalValue";
      payload: {
        key: keyof EmployeeModal["form"];
        value: EmployeeModal["form"][keyof EmployeeModal["form"]];
      };
    };

// A reducer
const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case "openEmployeeModal": {
      return {
        ...state,
        employeeModal: {
          ...initialEmployeeModalState,
          employeeId: action.payload.employeeId || null,
          form: action.payload.init
            ? { ...initialEmployeeModalState.form, ...action.payload.init }
            : initialEmployeeModalState.form,
          mode: action.payload.mode,
        },
      };
    }

    case "closeEmployeeModal": {
      return { ...state, employeeModal: null };
    }

    case "openWarninModal": {
      return {
        ...state,
        warningModal: { employeeId: action.payload.employeeId },
      };
    }

    case "closeWarningModal": {
      return { ...state, warningModal: null };
    }

    case "setModalValue": {
      if (!state.employeeModal) {
        return state;
      }

      return {
        ...state,
        employeeModal: {
          ...state.employeeModal,
          form: {
            ...state.employeeModal.form,
            [action.payload.key]: action.payload.value,
          },
        },
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
