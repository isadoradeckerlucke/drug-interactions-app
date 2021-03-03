import * as actions from "../../actions/searchTerm";
import * as types from "../../actions/types";

describe("search term action works as expected", function () {
  it("should create an action to set the search term state", function () {
    const expectedAction = {
      type: types.SET_SEARCH_TERM,
      payload: "adderall",
    };

    expect(actions.setSearchTerm("adderall")).toEqual(expectedAction);
  });
});
