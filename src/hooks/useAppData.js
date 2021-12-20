import { useEffect, useReducer } from 'react';
import axios from 'axios';

import { initialState, appStateReducer } from './appStateReducer'
import {
  SET_LOADING,
  SET_USER,
  SET_APP_DATA,
  SET_PROJECT,
  SET_BLOCK,
  SET_DAY
} from '../constants/actions'

import { getLastSunday } from '../helpers/timeHelpers'

export default function useAppData() {

  const [state, dispatch] = useReducer(appStateReducer, initialState);

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

    dispatch({ type: SET_DAY, day })
  }

  /**
   * Changes the current day by the input number of days.
   * Use a negative number to move to a previous day.
   * Use a positive number to move to a future day.
   * @param {number} days
   */
  const getWeek = () => {
    console.log("GETWEEK", state)
    return getLastSunday(state.day).valueOf()
  }

  const dateActions = {
    changeDay,
    getWeek
  }

  /********** AUTHENTICATION ************/
  const authenticate = () => {
    // Attempt to authenticate a previously-logged-in user.
    axios.post('/api/auth')
    // If the API returns a user object, update the state.
    .then(res => {
      dispatch({ type: SET_USER, user: res.data });
    })

    // And now we're done loading.
    .finally(() => dispatch({ type: SET_LOADING, loading: false }))
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
  const loadAll = () => {
    Promise.all([
      axios.get('/api/projects'),
      axios.get('/api/blocks/week'),
      axios.get('/api/sessions/week')
    ])
      .then(allRes => allRes.map(res => res.data))
      .then(all => {
        const [projectsArr, blocks, sessions] = all;
        dispatch({ type: SET_APP_DATA, projectsArr, blocks, sessions })
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

  const dataActions = {
    loadAll,
    addProject,
    updateProject,
    scheduleBlock
  }

  /********** EFFECTS ***********************/
  // When the app is first loaded, check for existing credentials.
  useEffect(authenticate, []);

  // When the user changes, load all of their data.
  useEffect(loadAll, [state.user])
  /***************************************/

  return {
    state,
    dateActions,
    authActions,
    dataActions
  }
}