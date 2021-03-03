import { TOGGLE_LOADING, RESET_LOADING } from "../actions/types";
const INITIAL_STATE = { loading: false };

function loading(state = INITIAL_STATE, action) {
  switch (action.type) {
    case TOGGLE_LOADING:
      return { ...state, loading: !state.loading };
    case RESET_LOADING:
      return { ...INITIAL_STATE };
    default:
      return state;
  }
}

export default loading;
