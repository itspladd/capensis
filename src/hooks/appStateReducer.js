import { makeNoonDate } from '../helpers/timeHelpers'

import {
  SET_APP_DATA,
  SET_LOADING,
  SET_USER,
  SET_PROJECT,
  DELETE_PROJECT,
  SET_BLOCK,
  DELETE_BLOCK,
  SET_DAY
} from '../constants/actions'

// Initial state to be used by the reducer.
export const initialState = {
  loading: true,
  day: makeNoonDate(new Date()),
  user: null,
  projects: {},
  blocks: [],
  sessions: []
}

// This reducer function contains helper functions for each possible action.
// Actions are defined above.
export function appStateReducer(state, action) {

  const setAppData = ({ projectsArr, blocks, sessions }) => {
    // Turn the projects array to an object for easier usage in state
    const projects = {}
    projectsArr.forEach(p => projects[p.id] = p)

    // Set all in the state
    return { ...state, projects, blocks, sessions }
  }

  const setDay = ({ day }) => {
    return { ...state, day }
  }

  const setUser = ({ user }) => {
    if (!user) return { ...state, user: null };

    return { ...state, user: { ...user }}
  }

  const setLoading = ({ loading }) => {
    return { ...state, loading }
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

  const setBlock = ({ block }) => {
    const blocks = [...state.blocks]
    const index = blocks.findIndex(b => b.id === block.id)

    // If the block isn't already in the array, add it and sort.
    if (index === -1) {
      blocks.push({...block});
      blocks.sort((b1, b2) => b1.start_time - b2.start_time)
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

  const actions = {
    [SET_APP_DATA]: setAppData,
    [SET_DAY]: setDay,
    [SET_LOADING]: setLoading,
    [SET_USER]: setUser,
    [SET_PROJECT]: setProject,
    [DELETE_PROJECT]: deleteProject,
    [SET_BLOCK]: setBlock,
    [DELETE_BLOCK]: deleteBlock
  }

  return actions[action.type]({ ...action })
}