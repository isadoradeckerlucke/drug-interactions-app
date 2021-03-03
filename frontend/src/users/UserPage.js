import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import DrugInteractionApi from "../Api";
import { setCurrentUser } from "../actions/currentUser";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import "./UserPage.css";

function UserPage() {
  const { username } = useParams();
  const dispatch = useDispatch();

  const currentUser = useSelector((st) => st.currentUser);
  // if they're not logged in as this user, show error page
  if (currentUser.isLoggedIn !== true) {
    return (
      <h1>you must be logged in as {username} in order to view this page</h1>
    );
  } else if (currentUser.currentUser.username !== username) {
    return (
      <h1>you must be logged in as {username} in order to view this page</h1>
    );
  }
  const savedDrugs = currentUser.currentUser.savedDrugs;
  async function unsave(e) {
    e.preventDefault();
    await DrugInteractionApi.unsaveDrug(username, e.target.value);
    dispatch(setCurrentUser(username));
  }

  // otherwise show a list of their saved drugs, and each should have a button to unsave
  return (
    <div>
      <h1>{username}'s saved drugs</h1>
      {savedDrugs.length === 0 ? (
        <p>you haven't saved any drugs yet!</p>
      ) : (
        <ListGroup id="list-group">
          {savedDrugs.map((d) => (
            <ListGroup.Item key={d}>
              {d}{" "}
              <Button
                onClick={unsave}
                value={d}
                size="sm"
                variant="outline-danger"
              >
                {"  "}X{"  "}
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
}

export default UserPage;
