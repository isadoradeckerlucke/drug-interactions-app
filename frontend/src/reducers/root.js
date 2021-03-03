import { combineReducers } from "redux";
import drugs from "./drugs";
import loading from "./loading";
import searchTerm from "./searchTerm";
import currentUser from "./currentUser";

export default combineReducers({
  drugs,
  loading,
  searchTerm,
  currentUser,
});
