import * as actions from "../../actions/resetLoading";
import * as types from "../../actions/types";

describe("reset loading action works as expected", function () {
  it("should create an action to reset loading state", function () {
    const expectedAction = {
      type: types.RESET_LOADING,
    };

    expect(actions.resetLoading()).toEqual(expectedAction);
  });
});
