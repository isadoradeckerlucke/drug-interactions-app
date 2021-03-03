import DrugInteractionApi from "../Api";

describe("it communicates with the API", function () {
  it("gets interactions with single drug", async function () {
    let res = await DrugInteractionApi.getInteractions("adderall");
    expect(res.interactions).not.toBe(null);
  });

  it("gets interactions with multiple drugs", async function () {
    let res = await DrugInteractionApi.getMultipleInteractions([
      "adderall",
      "xanax",
    ]);
    expect(res.interactions).not.toBe(null);
  });
});
