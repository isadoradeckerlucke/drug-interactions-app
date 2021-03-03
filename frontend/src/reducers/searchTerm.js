import { SET_SEARCH_TERM } from "../actions/types";
const INITIAL_STATE = { searchTerm: "" };

function searchTerm(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload,
      };
    default:
      return state;
  }
}

export default searchTerm;
