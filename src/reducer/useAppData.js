import { useEffect, useReducer } from 'react';
import api from '../helpers/apiHelpers'

import { initialState, appStateReducer } from './appStateReducer'

import { ACTIONS as A } from '../constants/actions'

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
    const currentSunday = getLastSunday(state.day);
    const newSunday = getLastSunday(day);
    const newWeek = currentSunday.getDate() !== newSunday.getDate();

    // If we moved to a new week, load new weekly data from API.
    if (newWeek) loadWeek(newSunday)

    dispatch({ type: A.DAY.SET, day })
  }
  const yesterday = () => changeDay(-1);
  const tomorrow = () => changeDay(1);
  const lastWeek = () => changeDay(-7);
  const nextWeek = () => changeDay(7);

  const dateActions = {
    changeDay,
    yesterday,
    tomorrow,
    lastWeek,
    nextWeek
  }

  /********** AUTHENTICATION ************/
  const authenticate = () => {
    // Attempt to authenticate a previously-logged-in user.
    return api.auth.check()
      // If the API returns a user object, update the state.
      .then(user => {
        dispatch({ type: A.USER.SET, user });
        dispatch({ type: A.LOAD.SET, payload: { user: true } });
      })
  }

  const register = (username, rawPassword) => {
    return api.users.add(username, rawPassword)
      .then(user => dispatch({ type: A.USER.SET, user }))
  }

  const login = (username, rawPassword) => {
    return api.auth.login(username, rawPassword)
      .then(user => dispatch({ type: A.USER.SET, user }))
  }

  const logout = () => {
    return api.auth.logout()
      .then(() => dispatch({ type: A.USER.CLEAR }))
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
      return dispatch({ type: A.LOAD.SET_DATA_STATUS, status: true });
    }

    return Promise.all([
      api.projects.get(),
      api.blocks.get(),
      api.sessions.get(),
      api.sessions.getActive(),
      api.reports.get()
    ])
      .then(all => {
        const [projectsArr, blocks, sessions, trackedSession, reports] = all;
        dispatch({ type: A.SET_DATA, projectsArr, blocks, sessions, trackedSession, reports })
      })
      .then(() => dispatch({ type: A.LOAD.SET_DATA_STATUS, status: true }))
  }

  function loadWeek(sunday) {
    dispatch({ type: A.LOAD.SET_WEEKLY_STATUS, status: false })
    return Promise.all([
      api.blocks.getWeek(sunday),
      api.sessions.getWeek(sunday),
      api.reports.getWeek(sunday)
    ])
      .then(all => {
        const [blocks, sessions, reports] = all;
        dispatch({ type: A.BLOCKS.SET_ALL, blocks })
        dispatch({ type: A.SESSIONS.SET_ALL, sessions })
        dispatch({ type: A.REPORTS.SET, reports })
        dispatch({ type: A.LOAD.SET_WEEKLY_STATUS, status: true })
      })
  }

  const addProject = project => {
    return api.projects.add(project)
      .then(project => dispatch({ type: A.PROJECTS.SET, project }))
  }

  const updateProject = project => {
    return api.projects.edit(project)
      .then(project => dispatch({ type: A.PROJECTS.SET, project }))
  }

  const scheduleBlock = block => {
    return api.blocks.add(block)
      .then(block => dispatch({ type: A.BLOCKS.SET, block }))
  }

  const editBlock = block => {
    return api.blocks.edit(block)
      .then(block => dispatch({ type: A.BLOCKS.SET, block }))
  }

  const deleteBlock = id => {
    return api.blocks.del(id)
      .then(block => dispatch({ type: A.BLOCKS.DELETE, id: block.id }))
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
        const trackedSession = startNew ? all[all.length - 1] : null;
        dispatch({ type: A.TRACKING.SET, trackedSession })

        // Update any sessions that changed as a result of this toggle
        dispatch({ type: A.SESSIONS.SET, session: all })
      })
  }

  const editSession = (id, start_time, end_time) => {
    return api.sessions.edit({ id, start_time, end_time })
      .then(session => dispatch({ type: A.SESSIONS.SET, session }))
  }

  const deleteSession = (id) => {
    return api.sessions.del(id)
      .then(({id}) => dispatch({ type: A.SESSIONS.DELETE, id }))
  }

  const getWeeklyReport = date => {
    return api.reports.getWeek(date)
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
    deleteSession,
    getWeeklyReport
  }

  const actions = {
    date: dateActions,
    data: dataActions,
    auth: authActions
  }

  /********** EFFECTS ***********************/
  // When the app is first loaded, check for existing credentials.
  useEffect(authenticate, []);

  // When the user changes, load all of their data.
  useEffect(load, [state.user])
  /***************************************/

  return {
    state,
    actions,
    dateActions,
    authActions,
    dataActions
  }
}