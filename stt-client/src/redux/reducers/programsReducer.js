import {
  SET_PROGRAMS,
  SET_CURRENT_PROGRAM,
  APPEND_PROGRAM,
  CLEAR_PROGRAMS,
} from "../actions/types";

const initialState = {
  programs: [],
  currentProgram: {},
};

export default function programsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PROGRAMS:
      return Object.assign({}, state, {
        programs: action.programs,
      });
    case SET_CURRENT_PROGRAM:
      return Object.assign({}, state, {
        currentProgram: action.program,
      });
    case APPEND_PROGRAM:
      let programs = state.programs;
      programs = programs.concat(action.program);
      return Object.assign({}, state, {
        programs: programs,
      });
    case CLEAR_PROGRAMS:
      return Object.assign({}, state, initialState);
    default:
      return state;
  }
}
