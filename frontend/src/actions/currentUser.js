import DrugInteractionApi from "../Api";
import { SET_CURRENT_USER } from "./types";

function setCurrentUser(username) {
  return async function (dispatch) {
    let currentUser = await DrugInteractionApi.getUser(username);
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    if (currentUser) {
      dispatch(gotCurrentUser(currentUser));
    }
  };
}

function gotCurrentUser(currentUser) {
  return { type: SET_CURRENT_USER, payload: currentUser };
}

export { setCurrentUser };
