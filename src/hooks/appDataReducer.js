import {
  SET_APP_DATA,
  SET_LOADING,
  SET_USER,
  SET_PROJECT
} from '../constants/actions'

// This reducer function contains helper functions for each possible action.
// Actions are defined above.
export default function appDataReducer(state, action) {

  const setAppData = ({ projectsArr }) => {
    const projects = {}
    projectsArr.forEach(p => projects[p.id] = p)
    return { ...state, projects }
  }

  const setUser = ({ user }) => {
    if (!user) return { ...state, user: null };

    return { ...state, user: { ...user }}
  }

  const setLoading = ({ payload }) => {
    return { ...state, loading: payload }
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