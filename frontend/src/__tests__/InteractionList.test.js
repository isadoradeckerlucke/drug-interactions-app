import React from "react";
import { render } from "@testing-library/react";
import InteractionList from "../drugs/InteractionList";

describe("interaction list works as expected", function () {
  const interactionsFound = {
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

  const interactionsNotFound = {
    interactions: {
      noneFound: "there were no interactions found with this test drug",
    },
  };
  /** smoke test */
  it("renders without crashing", function () {
    render(<InteractionList interactions={interactionsFound} />);
  });

  /** snapshot test */
  it("matches snapshot with interactions found", function () {
    const { asFragment } = render(
      <InteractionList interactions={interactionsFound} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("matches snapshot with no interactions found", function () {
    const { asFragment } = render(
      <InteractionList interactions={interactionsNotFound} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
