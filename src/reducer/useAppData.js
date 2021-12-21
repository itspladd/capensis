import { useEffect, useReducer } from 'react';
import axios from 'axios';

import { initialState, appStateReducer } from './appStateReducer'

import {
  SET_LOADED,
  DATA_LOADED,
  SET_USER,
  SET_APP_DATA,
  SET_PROJECT,
  SET_BLOCKS,
  SET_BLOCK,
  SET_DAY,
  SET_WEEK,
  DELETE_BLOCK,
  SET_TRACKING,
  SET_SESSIONS,
  SET_SESSION,
  DELETE_SESSION
} from '../constants/actions'

import { getLastSunday } from '../helpers/timeHelpers'

export default function useAppData() {

  const [state, dispatch] = useReducer(appStateReducer, initialState);

  /********** LOADING WRAPPER ******/
  // Takes in other functions as a callback. 

  /********** DATE/TIME ************/
  /**
   * Changes the current day by the input number of days.
   * Use a negative number to move to a previous day.
   * Use a positive number to move to a future day.
   * @param {number} days
   */
  const changeDay = days => {
    const msDayMultiplier = 1000*60*60*24;
    const deltaMs = msDayMultiplier*days;
    const day = new Date(state.day.valueOf() + deltaMs);

    // Check for a new week
    const currentSundayMs = getLastSunday(state.day).valueOf();
    const newSundayMs = getLastSunday(day).valueOf();
    if (currentSundayMs !== newSundayMs) {
      console.log("changed week")
      dispatch({ type: SET_WEEK, week: newSundayMs })
    }

    dispatch({ type: SET_DAY, day })
  }

  /**
   * Changes the current day by the input number of days.
   * Use a negative number to move to a previous day.
   * Use a positive number to move to a future day.
   * @param {number} days
   */
  const getWeek = () => {
    return getLastSunday(state.day).valueOf()
  }

  const dateActions = {
    changeDay,
    getWeek
  }

  /********** AUTHENTICATION ************/
  const authenticate = () => {
    // Attempt to authenticate a previously-logged-in user.
    return axios.post('/api/auth')
      // If the API returns a user object, update the state.
      .then(res => {
        dispatch({ type: SET_USER, user: res.data });
        dispatch({ type: SET_LOADED, payload: { user: true } });
      })
  }

  const register = (username, rawPassword) => {
    return axios.post(`/api/users`, { username, rawPassword })
      .then(res => dispatch({ type: SET_USER, user: res.data }))
  }

  const login = (username, rawPassword) => {
    return axios.post(`/api/auth/login`, { username, rawPassword })
      .then(res => dispatch({ type: SET_USER, user: res.data }))
  }

  const logout = () => {
    return axios.post(`/api/auth/logout`)
      .then(() => dispatch({ type: SET_USER, user: null }))
  }

  const authActions = {
    register,
    login,
    logout,
  }
  /***************************************/

  /********** DATA ***********************/
  const load = () => {
    if (!state.user) {
      return dispatch({ type: DATA_LOADED });
    }

    return Promise.all([
      axios.get('/api/projects'),
      axios.get('/api/blocks/week'),
      axios.get('/api/sessions/week'),
      axios.get(`/api/sessions/current`)
    ])
      .then(allRes => allRes.map(res => res.data))
      .then(all => {
        const [projectsArr, blocks, sessions, trackedSession] = all;
        dispatch({ type: SET_APP_DATA, projectsArr, blocks, sessions, trackedSession })
      })
      .then(() => dispatch({ type: DATA_LOADED }))
  }

  const loadWeek = () => {
    const sunday = new Date(state.week)
    const sundayStr = sunday.toISOString();
    return Promise.all([
      axios.get(`/api/blocks/week?date=${sundayStr}`),
      axios.get(`/api/sessions/week?date=${sundayStr}`)
    ])
      .then(allRes => allRes.map(res => res.data))
      .then(all => {
        const [blocks, sessions] = all;
        dispatch({ type: SET_BLOCKS, blocks })
        dispatch({ type: SET_SESSIONS, sessions })
      })
  }

  const addProject = project => {
    return axios.post(`/api/projects`, { project })
      .then(res => dispatch({ type: SET_PROJECT, project: res.data }))
  }

  const updateProject = project => {
    return axios.patch(`/api/projects/${project.id}`, { project })
      .then(res => dispatch({ type: SET_PROJECT, project: res.data }))
  }

  const scheduleBlock = block => {
    return axios.post(`/api/blocks`, block)
      .then(res => dispatch({ type: SET_BLOCK, block: res.data }))
  }

  const editBlock = block => {
    return axios.patch(`/api/blocks/${block.id}`, block)
      .then(res => dispatch({ type: SET_BLOCK, block: res.data }))
  }

  const deleteBlock = id => {
    return axios.delete(`/api/blocks/${id}`)
      .then(res => dispatch({ type: DELETE_BLOCK, id }))
  }

  const toggleSession = project_id => {
    const { trackedSession } = state;
    const apiPromises = []
    const startNew =
      !trackedSession ||
      trackedSession.project_id !== project_id;

    // If there's an existing session, stop it.
    trackedSession && apiPromises.push(axios.patch(`/api/sessions`, { id: trackedSession.id }))

    // If we should start a new session, do so.
    startNew && apiPromises.push(axios.post(`/api/sessions`, { project_id }))

    // Also update any changed sessions.
    return Promise.all(apiPromises)
      .then(allRes => allRes.map(res => res.data))
      .then(all => {
        // Whichever promise is last in the array is what should be tracked.
        // Or if we didn't start a new one, the new tracking is null.
        const newTracking = startNew ? all[all.length - 1] : null;
        dispatch({ type: SET_TRACKING, payload: newTracking})

        // Update any sessions that changed as a result of this toggle
        dispatch({ type: SET_SESSION, payload: all })
      })
  }

  const editSession = (id, start_time, end_time) => {
    return axios.patch(`/api/sessions/${id}`, { start_time, end_time })
      .then(res => dispatch({ type: SET_SESSION, payload: res.data }))
  }

  const deleteSession = (id) => {
    return axios.delete(`/api/sessions/${id}`)
      .then(res => dispatch({ type: DELETE_SESSION, id: res.data.id }))
  }

  const dataActions = {
    load,
    addProject,
    updateProject,
    scheduleBlock,
    editBlock,
    deleteBlock,
    toggleSession,
    editSession,
    deleteSession
  }

  /********** EFFECTS ***********************/
  // When the app is first loaded, check for existing credentials.
  useEffect(authenticate, []);

  // When the user changes, load all of their data.
  useEffect(load, [state.user])

  // When we move to a new week, load new data for that week.
  useEffect(loadWeek, [state.week])
  /***************************************/

  return {
    state,
    dateActions,
    authActions,
    dataActions
  }
}