import React from "react";
import { render } from "@testing-library/react";
import UserPage from "../../users/UserPage";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { MemoryRouter, Route } from "react-router-dom";

describe("users page works as expected", function () {
  const currentUserTestLoggedIn = {
    isLoggedIn: true,
    currentUser: {
      username: "testuser",
      email: "testuser@gmail.com",
      savedDrugs: [],
    },
  };
  const currentUserTestLoggedOut = {
    isLoggedIn: false,
    currentUser: {},
  };

  const initialStateLoggedIn = {
    drugs: { interactions: {} },
    loading: { loading: false },
    currentUser: currentUserTestLoggedIn,
  };

  const initialStateLoggedOut = {
    drugs: { interactions: {} },
    loading: { loading: false },
    currentUser: currentUserTestLoggedOut,
  };

  const mockStore = configureStore();
  let store;

  /** smoke test */
  it("renders without crashing", function () {
    store = mockStore(initialStateLoggedIn);
    render(
      <MemoryRouter>
        <Provider store={store}>
          <UserPage />
        </Provider>
      </MemoryRouter>
    );
  });

  /** snapshot test */
  it("matches initial snapshot", function () {
    store = mockStore(initialStateLoggedIn);

    const { asFragment } = render(
      <MemoryRouter initialEntries={["/users/test3"]}>
        <Provider store={store}>
          <Route path="/users/:username">
            <UserPage />
          </Route>
        </Provider>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
