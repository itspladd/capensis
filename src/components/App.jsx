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
import Block from './Block';

// Custom hooks
import useAuthentication from '../hooks/useAuthentication'

export default function App() {

  const [loading, username, setUsername] = useAuthentication();
  const [blocks, setBlocks] = useState([]);

  const handleLogout = event => {
    event.preventDefault();
    axios.post(`/api/logout`)
         .then(res => setUsername(res.data.username))
  }

  const loadWeeklyBlocks = () => {
    axios.get(`/api/blocks/week`)
         .then(res => generateBlockComponents(res.data))
         .then(blocks => setBlocks(blocks))
  }

  const generateBlockComponents = blockArray => {
    return blockArray.map(blockObj => <Block {...blockObj} />)
  }

  // Load weekly blocks any time the username changes
  useEffect(loadWeeklyBlocks, [username]);

  return (
    <div className="App">
      {/* If we haven't finished trying to log in: */}
      {loading && <p>Currently loading...</p>}

      {/* If there's no valid login: */}
      {!loading && !username &&
        <LoginRegister setUsername={setUsername} />
      }

      {/* If we've successfully logged in: */}
      {!loading && username &&
        <>
          <Header username={username} handleLogout={handleLogout} />
          {blocks}
        </>
      }
    </div>
  );
}
