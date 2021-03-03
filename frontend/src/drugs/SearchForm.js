import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getInteractionsFromAPI } from "../actions/drugs";
import { resetInteractions } from "../actions/resetInteractions";
import { setCurrentUser } from "../actions/currentUser";
import DrugInteractionApi from "../Api";
import { toggleLoading } from "../actions/loading";
import { setSearchTerm } from "../actions/searchTerm";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function SearchForm() {
  /** form for searching drug interactions - one search bar initially, can add multiple additional drugs */
  const searchTerm = useSelector((st) => st.searchTerm.searchTerm);
  const currentUser = useSelector((st) => st.currentUser);
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    dispatch(resetInteractions());
  }, [dispatch]);

  async function handleSubmit(e) {
    e.preventDefault();
    let errorHolder = document.getElementById("error-holder");
    errorHolder.innerText = "";

    if (!searchTerm) {
      errorHolder.innerText = "please enter a search term";
      dispatch(resetInteractions());
      return;
    }

    dispatch(getInteractionsFromAPI(searchTerm.trim()));
    // if it's checked, save the drugs to the database and the user
    // then save the user with the new saved drugs
    let res;
    if (checked) {
      let username = currentUser.currentUser.username;
      if (searchTerm.includes(",")) {
        // check to make sure the drug isn't already saved, if it isn't then add it.
        const nameArray = searchTerm.split(", ");
        for (let name of nameArray) {
          // if they haven't already saved the drug
          if (currentUser.currentUser.savedDrugs.includes(name) !== true) {
            res = await DrugInteractionApi.saveDrugToUser(username, name);
          }
        }
      } else {
        if (currentUser.currentUser.savedDrugs.includes(searchTerm) !== true) {
          res = await DrugInteractionApi.saveDrugToUser(username, searchTerm);
        }
      }
      dispatch(setCurrentUser(username));
    }
    if (!res) {
      dispatch(toggleLoading());
    }
  }

  function handleChange(e) {
    dispatch(setSearchTerm(e.target.value));
  }
  function changeBool(e) {
    setChecked(!checked);
  }

  return (
    <div>
      <h3>
        search for high severity interactions with a single drug, or get all
        interactions between multiple drugs.
      </h3>
      <Form onSubmit={handleSubmit}>
        <Form.Label htmlFor="drugName">search interactions:</Form.Label>
        <Form.Control
          name="drugName"
          placeholder="drug name(s)"
          value={searchTerm}
          onChange={handleChange}
        />
        <br></br>
        {currentUser.isLoggedIn ? (
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              label="add searched drugs to saved list"
              name="saveBool"
              value={checked}
              onChange={changeBool}
            />
          </Form.Group>
        ) : (
          <span></span>
        )}
        <Form.Text id="searchHelpBlock" muted>
          please separate multiple drug names by commas
        </Form.Text>
        <br></br>
        <Button type="submit" className="btn btn-lg btn-dark">
          search
        </Button>
        <p id="error-holder"></p>
      </Form>
      <br></br>
    </div>
  );
}

export default SearchForm;
