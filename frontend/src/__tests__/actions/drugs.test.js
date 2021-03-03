import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actions from "../../actions/drugs";
import * as types from "../../actions/types";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const mockInteractionVyvanse = {
  "00": {
    description:
      "Amphetamine and derivatives - monoamine oxidase (MAO) inhibitors",
    name1: "lisdexamfetamine",
    name2: "selegiline",
    severity: "high",
    comment: "Vyvanse (711043) is resolved to lisdexamfetamine (700810)",
  },
  "01": {
    description:
      "Amphetamine and derivatives - monoamine oxidase (MAO) inhibitors",
    name1: "lisdexamfetamine",
    name2: "procarbazine",
    severity: "high",
    comment: "Vyvanse (711043) is resolved to lisdexamfetamine (700810)",
  },
  "02": {
    description:
      "Amphetamine and derivatives - monoamine oxidase (MAO) inhibitors",
    name1: "lisdexamfetamine",
    name2: "isocarboxazid",
    severity: "high",
    comment: "Vyvanse (711043) is resolved to lisdexamfetamine (700810)",
  },
  "03": {
    description:
      "Amphetamine and derivatives - monoamine oxidase (MAO) inhibitors",
    name1: "lisdexamfetamine",
    name2: "tranylcypromine",
    severity: "high",
    comment: "Vyvanse (711043) is resolved to lisdexamfetamine (700810)",
  },
  "04": {
    description:
      "Amphetamine and derivatives - monoamine oxidase (MAO) inhibitors",
    name1: "lisdexamfetamine",
    name2: "phenelzine",
    severity: "high",
    comment: "Vyvanse (711043) is resolved to lisdexamfetamine (700810)",
  },
};

const noneFoundResponse = {
  noneFound: "There is no drug in our system with the name hello.",
};

const mockInteractionMultiple = {
  "00": {
    description:
      "Cephalexin may decrease the excretion rate of Ibuprofen which could result in a higher serum level.",
    name1: "cephalexin",
    name2: "ibuprofen",
    severity: "N/A",
    comment:
      "Drug1 (rxcui = 2231, name = cephalexin, tty = IN). Drug2 (rxcui = 5640, name = ibuprofen, tty = IN). Drug1 is resolved to cephalexin, Drug2 is resolved to ibuprofen and interaction asserted in DrugBank between Cephalexin and Ibuprofen.",
  },
  10: {
    description:
      "Cephalexin may decrease the excretion rate of Ibuprofen which could result in a higher serum level.",
    name1: "ibuprofen",
    name2: "cephalexin anhydrous",
    severity: "N/A",
    comment:
      "Drug1 (rxcui = 5640, name = ibuprofen, tty = IN). Drug2 (rxcui = 2231, name = cephalexin, tty = IN). Drug1 is resolved to ibuprofen, Drug2 is resolved to cephalexin anhydrous and interaction asserted in DrugBank between Ibuprofen and Cephalexin.",
  },
};

const initialState = {
  drugs: { interactions: {} },
  loading: { loading: false },
  searchTerm: { searchTerm: "" },
};

describe("drugs actions work as expected", function () {
  it("creates SEARCH_DRUGS after successfully fetching interactions with single drug", function () {
    const expectedActions = [
      {
        type: types.SEARCH_DRUGS,
        payload: mockInteractionVyvanse,
      },
    ];

    const store = mockStore(initialState);
    return store
      .dispatch(actions.getInteractionsFromAPI("vyvanse"))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it("creates SEARCH_DRUGS after successfully fetching interactions with multiple drugs", function () {
    const expectedActions = [
      {
        type: types.SEARCH_DRUGS,
        payload: mockInteractionMultiple,
      },
    ];

    const store = mockStore(initialState);
    return store
      .dispatch(actions.getInteractionsFromAPI("ibuprofen, cephalexin"))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it("creates SEARCH_DRUGS and returns correctly with bad input", function () {
    const expectedActions = [
      {
        type: types.SEARCH_DRUGS,
        payload: noneFoundResponse,
      },
    ];

    const store = mockStore(initialState);
    return store.dispatch(actions.getInteractionsFromAPI("hello")).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
