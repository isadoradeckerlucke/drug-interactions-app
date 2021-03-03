import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

class DrugInteractionApi {
  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params })).data;
    } catch (err) {
      console.error("API Error:", err.response);
    }
  }

  // API routes

  // drug routes
  static async getInteractions(drugName) {
    /** get all interactions with one drug */
    let res = await this.request(`interactions/search/single/${drugName}`);
    return res;
  }

  static async getMultipleInteractions(drugArray) {
    /** get interactions between multiple specified drugs */
    let drugs = drugArray.join("+");
    let res = await this.request(`interactions/search/multiple/${drugs}`);
    return res;
  }

  // user routes
  static async login(data) {
    /** login an existing user */
    let res = await this.request(`users/login`, data, "post");
    if (!res) {
      return { invalid: "invalid username/password combo" };
    }
    return res.user;
  }

  static async signup(data) {
    /** signup a new user */
    let res = await this.request(`users/signup`, data, "post");
    console.log(res, "res from signup");
    if (res.invalid) {
      return { invalid: res.invalid };
    }
    return res.newUser;
  }

  static async updateUser(username, data) {
    /** update an existing user */
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }

  static async deleteUser(username) {
    /** delete an existing user */
    let res = await this.request(`users/${username}`, {}, "delete");
    return res.deleted;
  }

  static async saveDrugToUser(username, med_name) {
    /** save a drug to an existing user */
    let res = await this.request(
      `users/${username}/drugs/${med_name}`,
      {},
      "post"
    );
    if (res.noneFound) {
      return res.noneFound;
    } else {
      return res.saved;
    }
  }

  static async unsaveDrug(username, med_name) {
    let res = await this.request(
      `users/${username}/drugs/${med_name}`,
      {},
      "delete"
    );
    return res;
  }

  static async getUser(username) {
    /** get username, email and saved drugs info on a saved user */
    let res = await this.request(`users/${username}`);
    return res.user;
  }
}

export default DrugInteractionApi;
