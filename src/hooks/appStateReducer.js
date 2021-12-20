import {
  SET_APP_DATA,
  SET_LOADING,
  SET_USER,
  SET_PROJECT
} from '../constants/actions'

// Initial state to be used by the reducer.
export const initialState = {
  loading: true,
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

  const setUser = ({ user }) => {
    if (!user) return { ...state, user: null };

    return { ...state, user: { ...user }}
  }

  const setLoading = ({ loading }) => {
    return { ...state, loading }
  }

  const setProject = ({ id, project }) => {
    const projects = { ...state.projects }

    if (!project) delete projects[id];
    if (!id) projects[project.id] = project;

    return { ...state, projects}
  }

  const actions = {
    [SET_APP_DATA]: setAppData,
    [SET_LOADING]: setLoading,
    [SET_USER]: setUser,
    [SET_PROJECT]: setProject
  }

  return actions[action.type]({ ...action })
}