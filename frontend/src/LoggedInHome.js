import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetLoading } from "./actions/resetLoading";
import { toggleLoading } from "./actions/loading";
import { getInteractionsFromAPI } from "./actions/drugs";
import InteractionList from "./drugs/InteractionList";
import LoadingPage from "./LoadingPage";

function LoggedInHome(currentUser) {
  const interactions = useSelector((st) => st.drugs.interactions);
  const loading = useSelector((st) => st.loading.loading);
  const dispatch = useDispatch();

  const savedDrugsString = currentUser.currentUser.currentUser.savedDrugs.join(
    ", "
  );

  // get interactions with the users saved drugs, and toggle loading to true
  useEffect(() => {
    dispatch(getInteractionsFromAPI(savedDrugsString));
    dispatch(toggleLoading());
  }, [dispatch, savedDrugsString]);

  // when the interactions are loaded, reset loading to false
  useEffect(() => {
    if (interactions) {
      dispatch(resetLoading());
    }
  }, [dispatch, interactions]);

  return (
    <div>
      <h2>
        Welcome to the Drug Interaction Hub,{" "}
        {currentUser.currentUser.currentUser.username}
      </h2>
      <h4>interactions with your saved medications:</h4>
      {loading ? (
        <LoadingPage searchTerm={savedDrugsString}></LoadingPage>
      ) : (
        <p id="error-holder"></p>
      )}
      {interactions ? (
        Object.keys(interactions).length !== 0 ? (
          <InteractionList interactions={interactions} />
        ) : (
          <p>sorry, no results were found</p>
        )
      ) : (
        <p></p>
      )}{" "}
    </div>
  );
}

export default LoggedInHome;
