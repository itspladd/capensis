import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';

export default function useSessionTracking(username, refreshData) {
  const [currentId, setCurrentId] = useState(null);
  const [currentProject, setCurrentProject] = useState(null);

  const extractResponse = res => {
    const array = [...res.data]
    if (!array.length) return {};
    if (array.length === 1) return array[0];
    if (array.length > 1) return array;
  }

  const updateSession = useCallback(
    res => {
      const { id = null, project_id = null } = extractResponse(res);
      setCurrentId(id);
      setCurrentProject(project_id);
    },
    []
  )

  const clearSession = () => {
    setCurrentProject(null);
    setCurrentId(null);
  }

  useEffect(() => {
    // When the username changes, ping the server to see if there's an open session.
    // If there is, load it into the state.
    axios.get(`/api/sessions/current`)
         .then(updateSession)
  }, [username, updateSession])

  const startTracking = project_id => {
    return axios.post(`/api/sessions`, { project_id })
      .then(updateSession)
      .then(refreshData)
  }

  const stopTracking = () => {
    return axios.patch(`/api/sessions`, { id: currentId })
      .then(clearSession)
      .then(refreshData)
  }

  const toggleSession = project_id => {
    // If there's a new project id input, we're starting a new session.
    const differentProject = project_id && (project_id !== currentProject);

    // If we have a session running already, ping the API to stop it.
    currentId && stopTracking()

    // If we're toggling a new project, start tracking the new project.
    differentProject && startTracking(project_id)
  }

  return [currentProject, toggleSession];
}