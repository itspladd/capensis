import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useAuthentication() {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);

  // Attempt to authenticate the user if they've logged in previously.
  useEffect(() => {
    console.log('authenticating')
    axios.post('/api/authenticate')
      .then(res => {
        setUsername(res.data.username)
        setLoading(false);
      })
  }, []);

  const login = username => {
    setUsername(username);
  }

  const logout = event => {
    event.preventDefault();
    axios.post(`/api/logout`)
         .then(res => setUsername(res.data.username))
  }

  return [loading, username, login, logout];
}
