import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actions from "../../actions/currentUser";
import * as types from "../../actions/types";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {
  currentUser: {
    savedDrugs: [],
    username: "test3",
    email: "test3@gmail.com",
  },
};
describe("current user actions work as expected", function () {
  it("creates SET_CURRENT_USER after successfully setting user", function () {
    const store = mockStore(initialState);
    return store.dispatch(actions.setCurrentUser("test3")).then(() => {
      expect(store.getActions()[0].type).toEqual(types.SET_CURRENT_USER);
    });
  });
});
