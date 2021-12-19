import { useEffect, useReducer } from 'react';
import axios from 'axios';


export default function useAppData() {

  const initialState = {
    loading: true,
    user: null
  }

  // REDUCER ACTIONS: Each of these corresponds to a specific reducer action.
  const STOP_LOADING = "STOP_LOADING"
  const SET_USER = "SET_USER";

  // This reducer function contains helper functions for each possible action.
  // Actions are defined above.
  function reducer(state, action) {
    const setUser = ({ username }) => {
      return { ...state, user: { username }}
    }

    const stopLoading = () => {
      return { ...state, loading: false }
    }

    const actions = {
      [STOP_LOADING]: stopLoading,
      [SET_USER]: setUser,
      
    }

    return actions[action.type]({ ...action })
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // Attempt to authenticate a previously-logged-in user.
    axios.post('/api/auth')
      // If the API returns a user object, update the state.
      .then(res => {
        const { user } = res.data;
        user && dispatch({ type: SET_USER, ...user });
      })
      .finally(() => dispatch({ type: STOP_LOADING }))
  }, []);

  return {
    state
  }
}