import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setCurrentUser } from "../actions/currentUser";
import DrugInteractionApi from "../Api";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function Signup() {
  /** form for signing up a new user */
  const currentUser = useSelector((st) => st.currentUser);
  const dispatch = useDispatch();
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });
  if (currentUser && currentUser.isLoggedIn === true) {
    return (
      <div>
        <h1>Sign Up</h1>
        <h3>
          please log {currentUser.currentUser.username} out before proceeding.
        </h3>
      </div>
    );
  }
  async function handleSubmit(e) {
    e.preventDefault();
    let signupError = document.getElementById("signup-error");
    signupError.innerText = "";

    try {
      let result = await DrugInteractionApi.signup(formData);
      if (result.invalid) {
        signupError.innerText = result.invalid;
        setFormData({
          username: "",
          email: "",
          password: "",
        });
        return;
      }
      dispatch(setCurrentUser(result.username));
      history.push("/");
    } catch (errors) {
      console.error("signup failed", errors);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  }

  return (
    <div>
      <h1>Sign Up</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            username
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              placeholder="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            email
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              placeholder="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            password
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              placeholder="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>
        <Button type="submit">Sign Up</Button>
      </Form>
      <p id="signup-error"></p>
    </div>
  );
}

export default Signup;
