import * as actions from "../../actions/logout";
import * as types from "../../actions/types";

describe("logout action works as expected", function () {
  it("should create an action to log user out", function () {
    const expectedAction = {
      type: types.LOG_OUT,
    };
    expect(actions.logOut()).toEqual(expectedAction);
    expect(localStorage.getItem("currentUser")).toBe(null);
  });
});
