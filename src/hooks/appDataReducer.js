import {
  SET_LOADING,
  SET_USER
} from '../constants/actions'

// This reducer function contains helper functions for each possible action.
// Actions are defined above.
export default function appDataReducer(state, action) {
  const setUser = ({ user }) => {
    if (!user) return { ...state, user: null };

    return { ...state, user: { ...user }}
  }

  const setLoading = ({ payload }) => {
    return { ...state, loading: payload }
  }

  const actions = {
    [SET_LOADING]: setLoading,
    [SET_USER]: setUser,
  }

  return actions[action.type]({ ...action })
}