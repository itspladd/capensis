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

  useEffect(() => {
    console.log('in useEffect');
    axios.get(`/`)
      .then(res => console.log(res));
  })

  return (
    <div className="App">
      <p>hi</p>
    </div>
  );
}
