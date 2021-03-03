import * as actions from "../../actions/loading";
import * as types from "../../actions/types";

describe("loading action works as expected", function () {
  it("should create an action to toggle loading state", function () {
    const expectedAction = {
      type: types.TOGGLE_LOADING,
    };

    expect(actions.toggleLoading()).toEqual(expectedAction);
  });
});
