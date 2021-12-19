import { useEffect, useReducer } from 'react';
import axios from 'axios';

import appDataReducer from './appDataReducer'
import {
  SET_LOADING,
  SET_USER
} from '../constants/actions'

export default function useAppData() {

  const initialState = {
    loading: true,
    user: null
  }

  const [state, dispatch] = useReducer(appDataReducer, initialState);

  useEffect(() => {
    // Attempt to authenticate a previously-logged-in user.
    axios.post('/api/auth')
      // If the API returns a user object, update the state.
      .then(res => {
        const { user } = res.data;
        user && dispatch({ type: SET_USER, user });
      })

      // And now we're done loading.
      .finally(() => dispatch({ type: SET_LOADING, payload: false }))
  }, []);

  // Authentication actions
  const login = (username, rawPassword) => {
    axios.post(`/api/auth/login`, { username, rawPassword })
      .then(res => {
        const { user } = res.data;
        user && dispatch({ type: SET_USER, user })
      })
  }

  const logout = () => {
    axios.post(`/api/auth/logout`)
      .then(() => dispatch({ type: SET_USER, user: null }))
  }

  const authActions = {
    login,
    logout
  }

  return {
    state,
    authActions
  }
}