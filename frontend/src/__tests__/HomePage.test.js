import React from "react";
import { render } from "@testing-library/react";
import HomePage from "../HomePage";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import configureStore from "redux-mock-store";

describe("home page works as expected", function () {
  const initialState = {
    searchTerm: { searchTerm: "adderall" },
    currentUser: {
      isLoggedIn: true,
      currentUser: {
        username: "testuser",
        email: "testuser@gmail.com",
        savedDrugs: [],
      },
    },
  };
  const initialStateLoggedOut = {
    searchTerm: { searchTerm: "adderall" },
    currentUser: {
      isLoggedIn: false,
      currentUser: {},
    },
  };
  const mockStore = configureStore();
  let store;

  /** smoke test */
  it("renders without crashing, logged in user", function () {
    store = mockStore(initialState);
    render(
      <MemoryRouter>
        <Provider store={store}>
          <HomePage />
        </Provider>
      </MemoryRouter>
    );
  });

  /** snapshot test */
  it("matches snapshot, logged in user", function () {
    store = mockStore(initialState);
    const { asFragment } = render(
      <MemoryRouter>
        <Provider store={store}>
          <HomePage />
        </Provider>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  /** smoke test */
  it("renders without crashing, logged out user", function () {
    store = mockStore(initialStateLoggedOut);
    render(
      <MemoryRouter>
        <Provider store={store}>
          <HomePage />
        </Provider>
      </MemoryRouter>
    );
  });

  /** snapshot test */
  it("matches snapshot, logged out user", function () {
    store = mockStore(initialStateLoggedOut);
    const { asFragment } = render(
      <MemoryRouter>
        <Provider store={store}>
          <HomePage />
        </Provider>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
