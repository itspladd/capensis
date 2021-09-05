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

  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null)

  // Attempt to authenticate the user if they've logged in previously.
  useEffect(() => {
    axios.post('/api/authenticate')
      .then(res => {
        setUsername(res.data.username)
        setLoading(false);
      })
  }, [])

  return (
    <div className="App">
      <p>User is {username}</p>
      {/* If we haven't finished trying to log in: */}
      {loading && <p>Currently loading...</p>}

      {/* If we've finished trying to log in and there's no user: */}
      {!loading && !username &&
        <p>You aren't logged in!</p>
      }

      {/* If we've successfully logged in: */}
      {!loading && username &&
        <p>You are logged in!</p>
      }
    </div>
  );
}
