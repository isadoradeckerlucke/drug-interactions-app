import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Interactions from "./drugs/Interactions";
import HomePage from "./HomePage";
import Login from "./users/Login";
import Signup from "./users/Signup";
import UserPage from "./users/UserPage";

function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route exact path="/interactions">
        <Interactions />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/signup">
        <Signup />
      </Route>
      <Route exact path="/users/:username">
        <UserPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
}

export default Routes;
