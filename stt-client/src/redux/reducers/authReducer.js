import { LOGGED_IN, LOGGED_OUT, USER_LOADING } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  loading: false,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGGED_IN:
      console.log("login");
      return Object.assign({}, state, {
        isAuthenticated: true,
        loading: false,
      });
    case LOGGED_OUT:
      console.log("logout");
      return Object.assign({}, state, {
        isAuthenticated: false,
      });
    case USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
