import axios from 'axios';
import { useState, useEffect } from 'react';

export default function useSessionTracking(username) {
  const [currentSession, setCurrentSession] = useState({});

  useEffect(() => {
    // When the username changes, ping the server to see if there's an open session.
    // If there is, load it into the state.
    axios.get(`/api/sessions/current`)
         .then(res => {
           if(res.data[0]) setCurrentSession(res.data[0]);
         })
  }, [username])

  const toggleSession = event => {
    // Try to find the nearest "block" class element.
    const block = event.target.closest('.block')

    // If there is one, then the user clicked on a block.
    if (block) {
      // Get the project ID from the block. Cast it to a number for comparison later.
      const projectId = Number(block.getAttribute('projectid'))
      // If we have a session running already, ping the API to stop it.
      if (currentSession.id) {
        axios.patch(`/api/sessions`, { session_id: currentSession.id })
      }

      // If the input matches the currently-tracked session, just stop
      // the current session without starting a new one.
      if (projectId === currentSession.project_id) {
        setCurrentSession({});
      } else {
        // Otherwise, ping the API to start a new session and start tracking.
        axios.post(`/api/sessions`, { project_id: projectId })
            .then(res => setCurrentSession(res.data))
      }
    }

  }

  return [currentSession, toggleSession];
}