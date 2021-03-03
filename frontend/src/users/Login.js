import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setCurrentUser } from "../actions/currentUser";
import DrugInteractionApi from "../Api";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function Login() {
  const currentUser = useSelector((st) => st.currentUser);
  const dispatch = useDispatch();
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  if (currentUser && currentUser.isLoggedIn === true) {
    return (
      <div>
        <h1>Log In</h1>
        <h3>
          please log {currentUser.currentUser.username} out before proceeding.
        </h3>
      </div>
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let loginError = document.getElementById("login-error");
    loginError.innerText = "";
    try {
      let result = await DrugInteractionApi.login(formData);
      if (result.invalid) {
        loginError.innerText = result.invalid;
        setFormData({
          username: "",
          password: "",
        });
        return;
      }
      dispatch(setCurrentUser(result.username));
      history.push("/");
    } catch (errors) {
      console.error("login failed", errors);
    }
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((l) => ({ ...l, [name]: value }));
  }

  return (
    <div>
      <h1>Log In</h1>
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
        <Button type="submit">Log In</Button>
        <p id="login-error"></p>
      </Form>
    </div>
  );
}

export default Login;
