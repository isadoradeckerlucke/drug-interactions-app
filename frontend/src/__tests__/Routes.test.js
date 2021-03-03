import React from "react";
import { render } from "@testing-library/react";
import Routes from "../Routes";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import configureStore from "redux-mock-store";

describe("routes work as expected", function () {
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

  it("renders without crashing", function () {
    store = mockStore(initialState);
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Routes />
        </Provider>
      </MemoryRouter>
    );
  });

  it("matches snapshot", function () {
    store = mockStore(initialState);
    const { asFragment } = render(
      <MemoryRouter>
        <Provider store={store}>
          <Routes />
        </Provider>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
