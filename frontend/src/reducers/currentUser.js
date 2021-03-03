import { SET_CURRENT_USER, LOG_OUT } from "../actions/types";
const user = localStorage.getItem("currentUser");
const INITIAL_STATE = user
  ? { isLoggedIn: true, currentUser: JSON.parse(user) }
  : { isLoggedIn: false, currentUser: null };

function currentUser(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isLoggedIn: true,
        currentUser: action.payload,
      };
    case LOG_OUT:
      return { ...INITIAL_STATE };
    default:
      return state;
  }
}

export default currentUser;
