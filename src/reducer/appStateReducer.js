import { getLastSunday, makeNoonDate, timeStringSorter } from '../helpers/timeHelpers'

import { ACTIONS as A } from '../constants/actions'

// Initial state to be used by the reducer.
export const initialState = {
  loaded: {
    user: false,
    data: {
      projects: false,
      sessions: false,
      blocks: false,
      reports: false,
      tracking: false
    }
  },
  day: makeNoonDate(new Date()),
  trackedSession: null,
  user: null,
  projects: {},
  blocks: [],
  sessions: [],
  reports: []
}

// This reducer function contains helper functions for each possible action.
// Actions are defined above.
export function appStateReducer(state, action) {
  console.log("reducer called with action:", action)
  /********** DATA ***********************/

  const setAppData = ({ projectsArr, blocks, sessions, trackedSession, reports }) => {
    // Turn the projects array to an object for easier usage in state
    const projects = {}
    projectsArr.forEach(p => projects[p.id] = p)

    // Set all in the state
    return { ...state, projects, blocks, sessions, trackedSession, reports }
  }

  const setDay = ({ day }) => {
    return { ...state, day }
  }

  const setUser = ({ user }) => {
    if (!user) {
      return { ...state, user: null }
    }
    return { ...state, user: { ...user }}
  }

  const clearUser = () => {
    return { ...state, user: null}
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

  const setWeeklyLoadStatus = ({ status }) => {
    const sessions = status;
    const blocks = status;
    const reports = status;
    const data = { ...state.loaded.data, sessions, blocks, reports }
    return { ...state, loaded: { ...state.loaded, data }}
  }

  // Set all data-related loading statuses to the payload value
  const setDataLoadStatus = ({ status }) => {
    const data = { ...state.loaded.data };
    for (const type in data) {
      data[type] = status;
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

  const setTrackedSession = ({ trackedSession }) => {
    return { ...state, trackedSession }
  }

  const setSession = ({ session }) => {
    if (!Array.isArray(session)) {
      session = [session]
    }
    const sessions = [...state.sessions];

    session.forEach(session => {
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

  const setReports = ({ reports }) => {
    return { ...state, reports }
  }

  const actions = {
    [A.SET_DATA]: setAppData,
    [A.DAY.SET]: setDay,
    [A.LOAD.SET]: setLoaded,
    [A.LOAD.SET_WEEKLY_STATUS]: setWeeklyLoadStatus,
    [A.LOAD.SET_DATA_STATUS]: setDataLoadStatus,
    [A.USER.SET]: setUser,
    [A.USER.CLEAR]: clearUser,
    [A.PROJECTS.SET]: setProject,
    [A.PROJECTS.DELETE]: deleteProject,
    [A.BLOCKS.SET_ALL]: setBlocks,
    [A.BLOCKS.SET]: setBlock,
    [A.BLOCKS.DELETE]: deleteBlock,
    [A.SESSIONS.SET_ALL]: setSessions,
    [A.SESSIONS.SET]: setSession,
    [A.SESSIONS.DELETE]: deleteSession,
    [A.REPORTS.SET]: setReports,
    [A.TRACKING.SET]: setTrackedSession,
  }

  return actions[action.type]({ ...action })
}