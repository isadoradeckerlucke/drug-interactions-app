import { SEARCH_DRUGS, RESET_INTERACTIONS } from "../actions/types";
const INITIAL_STATE = {};

function drugs(state = INITIAL_STATE, action) {
  switch (action.type) {
    case RESET_INTERACTIONS:
      return { ...INITIAL_STATE };

    case SEARCH_DRUGS:
      return {
        ...state,
        interactions: action.payload,
      };

    default:
      return state;
  }
}

export default drugs;
