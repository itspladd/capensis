import '../styles/App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function App() {

  // Attempt to log in the user.
  useEffect(() => {
    axios.post('/api/login')
      .then(res => console.log(res.data))
  })

  return (
    <div className="App">
      <p>hi</p>
    </div>
  );
}
