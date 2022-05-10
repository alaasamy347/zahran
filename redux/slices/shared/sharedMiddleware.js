// Main Imports
import { setLang } from "./sharedSlice";

export const langSession = (store) => (next) => (action) => {
  if (action.type.match(setLang)) {
    localStorage.setItem("lang", action.payload);
  }
  return next(action);
};
