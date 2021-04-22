import { SET_GOALS, APPEND_GOAL, CLEAR_GOALS } from "../actions/types";

const initialState = {
  goals: [],
};

export default function goalsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_GOALS:
      return Object.assign({}, state, {
        goals: action.goals,
      });
    case APPEND_GOAL:
      let goals = state.goals;
      goals = goals.concat(action.goal);
      console.log(goals);
      return Object.assign({}, state, {
        goals: goals,
      });
    case CLEAR_GOALS:
      return Object.assign({}, state, initialState);
    default:
      return state;
  }
}
