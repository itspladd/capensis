import axios from 'axios';
import { getLastSunday, makeNoonDate, timeStringSorter } from '../helpers/timeHelpers'
import api from '../helpers/api/api'
import {
  SET_APP_DATA,
  SET_LOADED,
  DATA_LOADED,
  SET_USER,
  SET_PROJECT,
  DELETE_PROJECT,
  SET_BLOCK,
  SET_BLOCKS,
  DELETE_BLOCK,
  SET_DAY,
  SET_WEEK,
  SET_TRACKING,
  SET_SESSIONS,
  SET_SESSION,
  DELETE_SESSION
} from '../constants/actions'

// Initial state to be used by the reducer.
export const initialState = {
  loaded: {
    user: false,
    data: {
      projects: false,
      sessions: false,
      blocks: false,
      tracking: false
    }
  },
  day: makeNoonDate(new Date()),
  week: getLastSunday(new Date()).valueOf(),
  trackedSession: null,
  user: null,
  projects: {},
  blocks: [],
  sessions: []
}

// This reducer function contains helper functions for each possible action.
// Actions are defined above.
export function appStateReducer(state, action) {

  const setAppData = ({ projectsArr, blocks, sessions, trackedSession }) => {
    // Turn the projects array to an object for easier usage in state
    const projects = {}
    projectsArr.forEach(p => projects[p.id] = p)

    // Set all in the state
    return { ...state, projects, blocks, sessions, trackedSession }
  }

  const setDay = ({ day }) => {
    return { ...state, day }
  }

  const setWeek = ({ week }) => {
    return { ...state, week }
  }

  const setUser = ({ user }) => {
    if (!user) return { ...state, user: null };

    return { ...state, user: { ...user }}
  }

  const setLoaded = ({ payload }) => {
    for (const dataType in payload) {
      if (state.loaded[dataType] === undefined) {
        throw new Error("setLoaded called with invalid data type:", dataType)
      }
    }

    const loaded = { ...state.loaded, ...payload }
    return { ...state, loaded }
  }

  const setDataLoaded = () => {
    // Set all data-related loading statuses to true
    const data = { ...state.loaded.data };
    for (const type in data) {
      data[type] = true;
    }

    return { ...state, loaded: { ...state.loaded, data }}
  }

  const setProject = ({ project }) => {
    const projects = { ...state.projects }
    projects[project.id] = project;

    return { ...state, projects}
  }

  const deleteProject = ({ id }) => {
    const projects = { ...state.projects }
    delete projects[id];

    return { ...state, projects}
  }

  const setBlocks = ({ blocks }) => {
    return { ...state, blocks }
  }

  const setBlock = ({ block }) => {
    const blocks = [...state.blocks]
    const index = blocks.findIndex(b => b.id === block.id)
    console.log("SETBLOCK:",block)
    block.title = state.projects[block.project_id].title
    // If the block isn't already in the array, add it and sort.
    if (index === -1) {
      blocks.push({...block});
      blocks.sort((b1, b2) => timeStringSorter(b1.start_time, b2.start_time))
      return { ...state, blocks };
    }

    // If the block was already in the array, edit it in place.
    blocks[index] = {...block};
    return { ...state, blocks }
  }

  const deleteBlock = ({ id }) => {
    const blocks = state.blocks.filter(b => b.id !== id);
    return { ...state, blocks }
  }

  const setTrackedSession = ({ payload }) => {
    return { ...state, trackedSession: payload }
  }

  const setSession = ({ payload }) => {
    if (!Array.isArray(payload)) {
      payload = [payload]
    }
    const sessions = [...state.sessions];

    payload.forEach(session => {
      const index = sessions.findIndex(s => s.id === session.id);

      // If the session isn't already in the array, add it and sort.
      if (index === -1) {
        sessions.push({...session});
        sessions.sort((s1, s2) => timeStringSorter(s1.start_time, s2.start_time))
        return { ...state, sessions };
      }

      // If the session was already in the array, edit it in place.
      sessions[index] = {...session};
    })
    return { ...state, sessions }
  }

  const deleteSession = ({ id }) => {
    const sessions = state.sessions.filter(s => s.id !== id);
    return { ...state, sessions }
  }

  const setSessions = ({ sessions }) => {
    return { ...state, sessions }
  }

  const actions = {
    [SET_APP_DATA]: setAppData,
    [SET_DAY]: setDay,
    [SET_LOADED]: setLoaded,
    [DATA_LOADED]: setDataLoaded,
    [SET_USER]: setUser,
    [SET_PROJECT]: setProject,
    [DELETE_PROJECT]: deleteProject,
    [SET_BLOCKS]: setBlocks,
    [SET_BLOCK]: setBlock,
    [DELETE_BLOCK]: deleteBlock,
    [SET_TRACKING]: setTrackedSession,
    [SET_SESSIONS]: setSessions,
    [SET_SESSION]: setSession,
    [DELETE_SESSION]: deleteSession,
    [SET_WEEK]: setWeek
  }

  return actions[action.type]({ ...action })
}