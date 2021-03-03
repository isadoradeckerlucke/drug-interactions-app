import React from "react";
import { render } from "@testing-library/react";
import Interactions from "../drugs/Interactions";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

describe("interactions page works as expected", function () {
  const currentUserTest = {
    isLoggedIn: true,
    currentUser: {
      username: "testuser",
      email: "testuser@gmail.com",
      savedDrugs: [],
    },
  };

  const initialState = {
    drugs: { interactions: {} },
    loading: { loading: false },
    searchTerm: { searchTerm: "adderall" },
    currentUser: currentUserTest,
  };

  const loadingState = {
    drugs: { interactions: {} },
    loading: { loading: true },
    searchTerm: { searchTerm: "adderall" },
    currentUser: currentUserTest,
  };

  const notFoundState = {
    drugs: { interactions: {} },
    loading: { loading: false },
    searchTerm: { searchTerm: "hello" },
    currentUser: currentUserTest,
  };

  const foundState = {
    drugs: {
      interactions: {
        "00": {
          comment: "test drug is resolved to test drug",
          description: "test description",
          name1: "drug1test",
          name2: "drug2test",
          severity: "high",
        },
        "01": {
          comment: "test drug is resolved to test drug",
          description: "test description",
          name1: "drug1test2",
          name2: "drug2test2",
          severity: "N/A",
        },
      },
    },
    loading: { loading: false },
    searchTerm: { searchTerm: "adderall" },
    currentUser: currentUserTest,
  };

  const mockStore = configureStore();
  let store;

  /** smoke test */
  it("renders without crashing", function () {
    store = mockStore(initialState);
    render(
      <Provider store={store}>
        <Interactions />
      </Provider>
    );
  });

  /** snapshot test */
  it("matches initial snapshot", function () {
    store = mockStore(initialState);

    const { asFragment } = render(
      <Provider store={store}>
        <Interactions />
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("matches snapshot when loading", function () {
    store = mockStore(loadingState);

    const { asFragment } = render(
      <Provider store={store}>
        <Interactions />
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("matches snapshot no interactions found", function () {
    store = mockStore(notFoundState);

    const { asFragment } = render(
      <Provider store={store}>
        <Interactions />
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("matches snapshot interactions found", function () {
    store = mockStore(foundState);

    const { asFragment } = render(
      <Provider store={store}>
        <Interactions />
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
