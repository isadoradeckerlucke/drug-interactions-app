import searchTerm from "../../reducers/searchTerm";
import * as types from "../../actions/types";

describe("searchTerm reducer works as expected", function () {
  it("should return the initial state", function () {
    expect(searchTerm(undefined, {})).toEqual({ searchTerm: "" });
  });

  it("should handle SET_SEARCH_TERM", function () {
    expect(
      searchTerm([], { type: types.SET_SEARCH_TERM, payload: "adderall" })
    ).toEqual({
      searchTerm: "adderall",
    });
  });
});
