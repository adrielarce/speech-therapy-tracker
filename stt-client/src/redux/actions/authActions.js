import { LOGGED_IN, LOGGED_OUT } from "./types";

export const loggedIn = () => ({
  type: LOGGED_IN,
});
export const loggedOut = () => ({
  type: LOGGED_OUT,
});

