import { useEffect, useReducer } from 'react';
import api from '../helpers/apiHelpers'

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
    return api.auth.check()
      // If the API returns a user object, update the state.
      .then(user => {
        dispatch({ type: SET_USER, user });
        dispatch({ type: SET_LOADED, payload: { user: true } });
      })
  }

  const register = (username, rawPassword) => {
    return api.users.add(username, rawPassword)
      .then(user => dispatch({ type: SET_USER, user }))
  }

  const login = (username, rawPassword) => {
    return api.auth.login(username, rawPassword)
      .then(user => dispatch({ type: SET_USER, user }))
  }

  const logout = () => {
    return api.auth.logout()
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
      api.projects.get(),
      api.blocks.get(),
      api.sessions.get(),
      api.sessions.getActive()
    ])
      .then(all => {
        const [projectsArr, blocks, sessions, trackedSession] = all;
        dispatch({ type: SET_APP_DATA, projectsArr, blocks, sessions, trackedSession })
      })
      .then(() => dispatch({ type: DATA_LOADED }))
  }

  const loadWeek = () => {
    const sunday = new Date(state.week)
    return Promise.all([
      api.blocks.getWeek(sunday),
      api.sessions.getWeek(sunday)
    ])
      .then(all => {
        const [blocks, sessions] = all;
        dispatch({ type: SET_BLOCKS, blocks })
        dispatch({ type: SET_SESSIONS, sessions })
      })
  }

  const addProject = project => {
    return api.projects.add(project)
      .then(project => dispatch({ type: SET_PROJECT, project }))
  }

  const updateProject = project => {
    return api.projects.edit(project)
      .then(project => dispatch({ type: SET_PROJECT, project }))
  }

  const scheduleBlock = block => {
    return api.blocks.add(block)
      .then(block => dispatch({ type: SET_BLOCK, block }))
  }

  const editBlock = block => {
    return api.blocks.edit(block)
      .then(block => dispatch({ type: SET_BLOCK, block }))
  }

  const deleteBlock = id => {
    return api.blocks.remove(id)
      .then(block => dispatch({ type: DELETE_BLOCK, id: block.id }))
  }

  const toggleSession = project_id => {
    const { trackedSession } = state;
    const apiPromises = []
    const startNew =
      !trackedSession ||
      trackedSession.project_id !== project_id;

    // If there's an existing session, stop it.
    trackedSession && apiPromises.push(api.sessions.stop(trackedSession.id))

    // If we should start a new session, do so.
    startNew && apiPromises.push(api.sessions.add(project_id))

    // Also update any changed sessions.
    return Promise.all(apiPromises)
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
    return api.sessions.edit({ id, start_time, end_time })
      .then(session => dispatch({ type: SET_SESSION, payload: session }))
  }

  const deleteSession = (id) => {
    return api.sessions.remove(id)
      .then(session => dispatch({ type: DELETE_SESSION, id: session.id }))
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