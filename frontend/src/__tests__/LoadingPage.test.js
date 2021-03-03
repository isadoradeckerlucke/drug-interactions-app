import React from "react";
import { render } from "@testing-library/react";
import LoadingPage from "../LoadingPage";

describe("loading page works as expected", function () {
  /** smoke test */
  it("renders without crashing", function () {
    render(<LoadingPage searchTerm={"adderall"} />);
  });

  it("shows loading page for individual drug", function () {
    const { getByText } = render(<LoadingPage searchTerm={"adderall"} />);

    expect(
      getByText("Loading all high-severity interactions with adderall...")
    ).not.toBeNull();
  });

  it("shows loading page for multiple drugs", function () {
    const { getByText } = render(
      <LoadingPage searchTerm={"adderall, xanax"} />
    );

    expect(
      getByText("Loading all interactions between adderall, xanax...")
    ).not.toBeNull();
  });
});
