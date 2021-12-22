// REDUCER ACTIONS: Each of these corresponds to a specific reducer action.
export const SET_APP_DATA = "SET_APP_DATA";
export const SET_LOADED = "SET_LOADED";
export const DATA_LOADED = "DATA_LOADED";
export const SET_DAY = "SET_CURRENT_DAY";
export const SET_WEEK = "SET_WEEK";
export const SET_USER = "SET_USER";
export const SET_PROJECT = "SET_PROJECT"
export const ADD_PROJECT = "ADD_PROJECT"
export const DELETE_PROJECT = "DELETE_PROJECT"
export const SET_BLOCK = "SET_BLOCK"
export const DELETE_BLOCK = "DELETE_BLOCK"
export const SET_TRACKING = "SET_TRACKING"
export const SET_BLOCKS = "SET_BLOCKS"
export const SET_SESSIONS = "SET_SESSIONS"
export const SET_SESSION = "SET_SESSION"
export const DELETE_SESSION = "DELETE_SESSION"

const AUTH = {
  CHECK: "AUTH_CHECK",
  LOGIN: "AUTH_LOGIN",
  LOGOUT: "AUTH_LOGOUT"
}

const LOAD = {
  ALL: "LOAD_ALL",
  LOADING: "SET_ALL_LOADING",
  SET: "SET_LOADED",
  DATA: {
    LOADING: "SET_DATA_LOADING",
    LOADED: "SET_DATA_LOADED"
  }
}

const USER = {
  SET: "SET_USER",
  ADD: "ADD_USER"
}

const TRACKING = {
  TOGGLE: "TOGGLE_TRACKING"
}

const DAY = {
  SET: "SET_DAY"
}

const BLOCKS = {
  SET: "SET_BLOCKS",
  ADD: "ADD_BLOCK",
  EDIT: "EDIT_BLOCK",
  DELETE: "DELETE_BLOCK",
}

const PROJECTS = {
  SET: "SET_PROJECT",
  ADD: "ADD_PROJECT",
  DELETE: "DELETE_PROJECT"
}

const SESSIONS = {
  SET: "SET_SESSIONS",
  ADD: "ADD_SESSION",
  EDIT: "EDIT_SESSION",
  DELETE: "DELETE_SESSION"
}

const ACTIONS = {
  AUTH,
  LOAD,
  USER,
  TRACKING,
  DAY,
  BLOCKS,
  PROJECTS,
  SESSIONS
}

export default ACTIONS;