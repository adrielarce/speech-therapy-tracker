const initialState = {
  currentClient: '',
  clients: [],
};

export default function clientReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_CURRENT_CLIENT":
      return Object.assign({}, state, {
        currentClient: action.client,
      });
    case "CLEAR_CLIENT":
      return Object.assign({}, state, {
        currentClient: '',
      });
    case "SET_ALL_CLIENTS":
      return Object.assign({}, state, {
        ...state,
        clients: action.clients,
      });
    case "CLEAR_CLIENTS":
      return Object.assign({}, state, initialState);
    default:
      return state;
  }
}
