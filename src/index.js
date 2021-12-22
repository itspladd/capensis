import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { ReducerState, ReducerActions } from './reducer/context'
import axios from 'axios';

import useAppData from './reducer/useAppData'

if (process.env.REACT_APP_API_URL) {
  axios.defaults.baseURL = process.env.REACT_APP_API_URL;
  axios.defaults.withCredentials = true;
}

function AppWithContext() {
  const { state, actions } = useAppData();
  return (
    <ReducerState.Provider value={state}>
      <ReducerActions.Provider value={actions}>
        <App />
      </ReducerActions.Provider>
    </ReducerState.Provider>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <AppWithContext />
  </React.StrictMode>,
  document.getElementById('root')
);
