import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { logOut } from "./actions/logout";

function NavBar() {
  const currentUser = useSelector((st) => st.currentUser);
  const dispatch = useDispatch();

  function logOutUser(e) {
    dispatch(logOut());
    window.location.reload();
  }

  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Navbar.Brand href="/">Drug Interaction Hub</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/interactions">Search Drug Interactions</Nav.Link>
          {currentUser.isLoggedIn ? (
            <Nav>
              <Nav.Link href={"/users/" + currentUser.currentUser.username}>
                My Saved Drugs
              </Nav.Link>
              <Button onClick={logOutUser} variant="outline-danger">
                Log Out
              </Button>
            </Nav>
          ) : (
            <Nav>
              <Nav.Link href="/signup">Sign Up</Nav.Link>
              <Nav.Link href="/login">Log In</Nav.Link>
            </Nav>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
