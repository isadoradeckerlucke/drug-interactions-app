import currentUser from "../../reducers/currentUser";
import * as types from "../../actions/types";

describe("current user reducer works as expected", function () {
  const testUser = {
    currentUser: {
      isLoggedIn: true,
      currentUser: {
        savedDrugs: [],
        username: "testuser123",
        email: "testuser@test.com",
      },
    },
  };
  it("should return the initial state", function () {
    expect(currentUser(undefined, {})).toEqual({
      isLoggedIn: false,
      currentUser: null,
    });
  });

  it("should handle SET_CURRENT_USER", function () {
    expect(
      currentUser([], { type: types.SET_CURRENT_USER, payload: testUser })
    ).toEqual({ isLoggedIn: true, currentUser: testUser });
  });

  it("should handle LOG_OUT", function () {
    expect(currentUser([], { type: types.LOG_OUT })).toEqual({
      isLoggedIn: false,
      currentUser: null,
    });
  });
});
