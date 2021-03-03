import React from "react";
import { render } from "@testing-library/react";
import App from "../App";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import configureStore from "redux-mock-store";

describe("app works as expected", function () {
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
  };
  const mockStore = configureStore();
  let store;

  /** smoke test */
  it("renders without crashing", function () {
    store = mockStore(initialState);
    render(
      <MemoryRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );
  });

  /** snapshot test */
  it("matches snapshot", function () {
    store = mockStore(initialState);
    const { asFragment } = render(
      <MemoryRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
