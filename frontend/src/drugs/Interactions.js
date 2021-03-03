import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SearchForm from "./SearchForm";
import InteractionList from "./InteractionList";
import { resetLoading } from "../actions/resetLoading";
import LoadingPage from "../LoadingPage";
import { setSearchTerm } from "../actions/searchTerm";

function Interactions() {
  const interactions = useSelector((st) => st.drugs.interactions);
  const loading = useSelector((st) => st.loading.loading);
  const searchTerm = useSelector((st) => st.searchTerm.searchTerm);
  const dispatch = useDispatch();

  useEffect(() => {
    if (interactions) {
      dispatch(resetLoading());
      dispatch(setSearchTerm(""));
    }
  }, [dispatch, interactions]);

  return (
    <div>
      <SearchForm />

      {loading ? (
        <LoadingPage searchTerm={searchTerm}></LoadingPage>
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
      )}
    </div>
  );
}

export default Interactions;
