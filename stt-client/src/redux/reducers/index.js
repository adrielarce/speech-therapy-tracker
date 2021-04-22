import { combineReducers } from "redux";
import clientReducer from "./clientReducer";
import authReducer from "./authReducer";
import programsReducer from "./programsReducer";
import goalsReducer from "./goalsReducer";

export default combineReducers({
  client: clientReducer,
  auth: authReducer,
  prog: programsReducer,
  goals: goalsReducer,
});