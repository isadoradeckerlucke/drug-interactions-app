import React from "react";
import { render, fireEvent } from "@testing-library/react";
import SearchForm from "../drugs/SearchForm";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

describe("search form works as expected", function () {
  const currentUserTest = {
    isLoggedIn: true,
    currentUser: {
      username: "testuser",
      email: "testuser@gmail.com",
      savedDrugs: [],
    },
  };
  const initialState = {
    searchTerm: { searchTerm: "" },
    currentUser: currentUserTest,
    drugs: { interactions: {} },
    loading: { loading: false },
  };
  const searchTermIn = {
    searchTerm: { searchTerm: "adderall" },
    currentUser: currentUserTest,
    drugs: { interactions: {} },
    loading: { loading: false },
  };
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);
  let store;

  /** smoke test */
  it("renders without crashing", function () {
    store = mockStore(initialState);
    render(
      <Provider store={store}>
        <SearchForm />
      </Provider>
    );
  });

  /** snapshot test */
  it("matches initial snapshot", function () {
    store = mockStore(initialState);

    const { asFragment } = render(
      <Provider store={store}>
        <SearchForm />
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("matches snapshot with search term in", function () {
    store = mockStore(searchTermIn);

    const { asFragment } = render(
      <Provider store={store}>
        <SearchForm />
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
