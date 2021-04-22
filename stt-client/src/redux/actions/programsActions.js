import { SET_CURRENT_PROGRAM, SET_PROGRAMS, APPEND_PROGRAM, CLEAR_PROGRAMS } from "./types";

export const storeProgram = (program) => ({
  type: SET_CURRENT_PROGRAM,
  program,
});

export const storeAllPrograms = (programs) => ({
  type: SET_PROGRAMS,
  programs,
});

export const appendProgram = (program) => ({
  type: APPEND_PROGRAM,
  program,
});

export const clearPrograms = () => ({
  type: CLEAR_PROGRAMS,
})