import React, { Reducer } from "react";

import { ReviewsEmployeesQuery } from "../generated/graphql";
import { StateContextValue } from "../hooks/useStateContext";
import createProvider from "./createProvider";

type ReviewModalMode = "create" | "edit";

interface ReviewModal {
  form: {
    content: string;
    targetId: number;
  };
  mode: ReviewModalMode;
  reviewId: number | null;
}

const initialReviewModalState: ReviewModal = {
  form: {
    content: "",
    targetId: 0,
  },
  mode: "create",
  reviewId: null,
};

interface State {
  employees: ReviewsEmployeesQuery["employees"];
  reviewModal: null | ReviewModal;
}

const initialState: State = {
  employees: [],
  reviewModal: null,
};

type Action =
  | { type: "setEmployees"; payload: ReviewsEmployeesQuery["employees"] }
  | {
      type: "openReviewModal";
      payload: {
        reviewId?: number;
        init?: Partial<ReviewModal["form"]>;
        mode: "create" | "edit";
      };
    }
  | { type: "closeReviewModal" }
  | {
      type: "setModalValue";
      payload: {
        key: keyof ReviewModal["form"];
        value: ReviewModal["form"][keyof ReviewModal["form"]];
      };
    };

// A reducer
const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case "setEmployees": {
      return { ...state, employees: action.payload };
    }

    case "openReviewModal": {
      return {
        ...state,
        reviewModal: {
          ...initialReviewModalState,
          form: action.payload.init
            ? { ...initialReviewModalState.form, ...action.payload.init }
            : initialReviewModalState.form,
          mode: action.payload.mode,
          reviewId: action.payload.reviewId || null,
        },
      };
    }

    case "closeReviewModal": {
      return { ...state, reviewModal: null };
    }

    case "setModalValue": {
      if (!state.reviewModal) {
        return state;
      }

      return {
        ...state,
        reviewModal: {
          ...state.reviewModal,
          form: {
            ...state.reviewModal.form,
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
