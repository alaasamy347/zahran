// Main Imports
import { updateUser } from "./userSlice";

export const userSession = (store) => (next) => (action) => {
  if (action.type.match(updateUser)) {
    localStorage.setItem("user", JSON.stringify(action.payload));
  }
  return next(action);
};
