import { SET_SEARCH_TERM } from "./types";

function setSearchTerm(searchTerm) {
  return { type: SET_SEARCH_TERM, payload: searchTerm };
}

export { setSearchTerm };
