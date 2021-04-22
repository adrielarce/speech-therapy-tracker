import { SET_CURRENT_CLIENT, SET_ALL_CLIENTS,CLEAR_CURRENT_CLIENT, CLEAR_CLIENTS } from "./types";

export const storeClient = (client) => ({
  type: SET_CURRENT_CLIENT,
  client,
});
export const clearCurrClient = () => ({
  type: CLEAR_CURRENT_CLIENT,
});
export const storeAllClients = (clients) => ({
  type: SET_ALL_CLIENTS,
  clients,
});
export const clearClients = () => ({
  type: CLEAR_CLIENTS,
});
