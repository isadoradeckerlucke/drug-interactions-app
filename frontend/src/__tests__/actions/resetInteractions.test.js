import * as actions from "../../actions/resetInteractions";
import * as types from "../../actions/types";

describe("reset interactions action works as expected", function () {
  it("should create an action to reset interactions state", function () {
    const expectedAction = {
      type: types.RESET_INTERACTIONS,
    };

    expect(actions.resetInteractions()).toEqual(expectedAction);
  });
});
