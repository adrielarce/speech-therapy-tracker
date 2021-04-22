import { SET_GOALS, APPEND_GOAL, CLEAR_GOALS } from "./types";

export const storeGoals = (goals) => ({
  type: SET_GOALS,
  goals,
});

export const appendGoal = (goal) => ({
  type: APPEND_GOAL,
  goal,
});

export const clearGoals = () => ({
  type: CLEAR_GOALS,
})