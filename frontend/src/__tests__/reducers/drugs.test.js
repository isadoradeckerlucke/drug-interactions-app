import drugs from "../../reducers/drugs";
import * as types from "../../actions/types";

describe("drugs reducer works as expected", function () {
  const testInteractions = {
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
  };
  it("should return the initial state", function () {
    expect(drugs(undefined, {})).toEqual({});
  });

  it("should handle RESET_INTERACTIONS", function () {
    expect(drugs([], { type: types.RESET_INTERACTIONS })).toEqual({});
  });

  it("should handle SEARCH_DRUGS", function () {
    expect(
      drugs([], { type: types.SEARCH_DRUGS, payload: testInteractions })
    ).toEqual({ interactions: testInteractions });
  });
});
