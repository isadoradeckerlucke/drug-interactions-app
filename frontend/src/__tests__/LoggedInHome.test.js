import React from "react";
import { render } from "@testing-library/react";
import LoggedInHome from "../LoggedInHome";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

describe("home page works as expected", function () {
  const currentUserTest = {
    isLoggedIn: true,
    currentUser: {
      username: "testuser",
      email: "testuser@gmail.com",
      savedDrugs: [],
    },
  };
  const initialState = {
    searchTerm: { searchTerm: "adderall" },
    currentUser: currentUserTest,
    drugs: { interactions: {} },
    loading: { loading: false },
  };
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);
  let store;

  /** smoke test */
  it("renders without crashing, logged in user", function () {
    store = mockStore(initialState);
    render(
      <MemoryRouter>
        <Provider store={store}>
          <LoggedInHome currentUser={currentUserTest} />
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
          <LoggedInHome currentUser={currentUserTest} />
        </Provider>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
