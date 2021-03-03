import React from "react";
import { render } from "@testing-library/react";
import NavBar from "../NavBar";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import configureStore from "redux-mock-store";

describe("nav bar works as expected", function () {
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
  const mockStore = configureStore();
  let store;

  it("renders without crashing", function () {
    store = mockStore(initialState);
    render(
      <MemoryRouter>
        <Provider store={store}>
          <NavBar />
        </Provider>
      </MemoryRouter>
    );
  });

  it("matches snapshot", function () {
    store = mockStore(initialState);
    const { asFragment } = render(
      <MemoryRouter>
        <Provider store={store}>
          <NavBar />
        </Provider>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
