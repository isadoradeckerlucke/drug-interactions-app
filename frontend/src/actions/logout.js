import { LOG_OUT } from "./types";

function logOut() {
  localStorage.removeItem("currentUser");
  return { type: LOG_OUT };
}

export { logOut };
