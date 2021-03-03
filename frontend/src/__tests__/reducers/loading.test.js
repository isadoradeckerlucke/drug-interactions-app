import loading from "../../reducers/loading";
import * as types from "../../actions/types";

describe("loading reducer works as expected", function () {
  it("should return the initial state", function () {
    expect(loading(undefined, {})).toEqual({ loading: false });
  });

  it("should handle RESET_LOADING", function () {
    expect(loading([], { type: types.RESET_LOADING })).toEqual({
      loading: false,
    });
  });

  it("should handle TOGGLE_LOADING", function () {
    expect(loading([], { type: types.TOGGLE_LOADING })).toEqual({
      loading: true,
    });
  });
});
