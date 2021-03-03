import DrugInteractionApi from "../Api";
import { SEARCH_DRUGS } from "./types";

function getInteractionsFromAPI(name) {
  return async function (dispatch) {
    let res;
    if (name.includes(",")) {
      let drugArr = name.split(", ");
      res = await DrugInteractionApi.getMultipleInteractions(drugArr);
    } else {
      res = await DrugInteractionApi.getInteractions(name);
    }
    const interactions = res.interactions;
    dispatch(gotInteractions(interactions));
  };
}

function gotInteractions(interactions) {
  return { type: SEARCH_DRUGS, payload: interactions };
}

export { getInteractionsFromAPI };
