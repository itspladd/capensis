import { useState, useEffect } from 'react';
import axios from 'axios';

import { getLastSunday, makeZeroDate } from '../helpers/timeHelpers'

// Ensures that the app always has the Blocks for the current week.
export default function useWeeklyBlocks(username) {
  const today = new Date();
  makeZeroDate(today);

  const [currentDay, setCurrentDay] = useState(today);
  const [blocks, setBlocks] = useState([]);

  // Uses an array of block objects from the API to create Block components.


  // A function to load blocks from the API and store them in state.
  const loadUserBlocks = () => {
    axios.get(`/api/blocks/week`)
    .then(res => setBlocks(res.data))
  }

  // Compares two input days. If one is in a different week than the other,
  // return true.
  const checkForNewWeek = (current, newDay) => {
    const currentSunday = getLastSunday(current);
    const newSunday = getLastSunday(newDay);
    if (currentSunday.getDate() !== newSunday.getDate()) {
      return true;
    }

    return false;
  }

  // Load the current week's blocks any time the username changes
  useEffect(loadUserBlocks, [username]);

  // Change currentDay by given number of days
  // i.e. days = 1 gives next day, days = -1 gives prev day
  // Check for new week and load new blocks if necessary.
  const changeDay = days => {
    const msDayMultiplier = 1000*60*60*24;
    const deltaMs = msDayMultiplier*days;
    const newDay = new Date(currentDay.valueOf() + deltaMs);
    const newWeek = checkForNewWeek(currentDay, newDay)
    if (newWeek) {
      axios.get(`/api/blocks/week?date=${newDay.toISOString()}`)
      .then(res => setBlocks(res.data))
    }
    setCurrentDay(newDay)
  }

  const refreshBlocks = () => {
    axios.get(`/api/blocks/week?date=${currentDay.toISOString()}`)
      .then(res => setBlocks(res.data))
  }

  return [blocks, refreshBlocks, currentDay, changeDay];
}