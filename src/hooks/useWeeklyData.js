import { useState, useEffect } from 'react';
import axios from 'axios';

// Ensures that the app always has the Blocks for the current week.
export default function useWeeklyData(username, weekMs) {
  const [blocks, setBlocks] = useState([]);
  const [sessions, setSessions] = useState([]);

  // A function to load blocks from the API and store them in state.
  const loadWeeklyData = () => {
    const sundayStr = new Date(weekMs).toISOString();
    console.log('loading weekly data...')
    console.log('sundayStr is:', sundayStr)
    axios.get(`/api/blocks/week?date=${sundayStr}`)
      .then(res => setBlocks(res.data))
    axios.get(`/api/sessions/week?date=${sundayStr}`)
      .then(res => setSessions(res.data))
  }

  // Load the current week's blocks any time the username changes
  useEffect(loadWeeklyData, [username, weekMs]);

  return [blocks, sessions, loadWeeklyData];
}