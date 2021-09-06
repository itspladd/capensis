import '../styles/App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

// Router components
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// My components
import LoginRegister from './LoginRegister';
import Header from './Header';

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

  const handleLogout = event => {
    event.preventDefault();
    axios.post(`/api/logout`)
         .then(res => setUsername(res.data.username))
  }

  return (
    <div className="App">
      {/* If we haven't finished trying to log in: */}
      {loading && <p>Currently loading...</p>}

      {/* If we've finished trying to log in and there's no user: */}
      {!loading && !username &&
        <LoginRegister setUsername={setUsername} />
      }

      {/* If we've successfully logged in: */}
      {!loading && username &&
        <>
          <Header username={username} handleLogout={handleLogout} />
        </>
      }
    </div>
  );
}
