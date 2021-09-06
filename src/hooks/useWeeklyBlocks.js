import { useState, useEffect } from 'react';
import axios from 'axios';

import Block from '../components/Block';

import { getLastSunday, makeZeroDate } from '../helpers/dayHelpers'

// Ensures that the app always has the Blocks for the current week.
export default function useWeeklyBlocks(username) {

  const today = new Date();
  makeZeroDate(today);
  const sunday = getLastSunday(today);

  const [currentDay, setCurrentDay] = useState(today);
  const [currentWeek, setCurrentWeek] = useState(sunday);
  const [blocks, setBlocks] = useState([]);

  // Uses an array of block objects from the API to create Block components.
  const generateBlockComponents = blockArray => {
    return blockArray.map(blockObj => <Block
      day={new Date(blockObj.schedule_date)}
      {...blockObj}
      />)
  }

  // Loads blocks from the API, generates Block components, and sets state.
  const loadUserBlocks = () => {
    axios.get(`/api/blocks/week?date=${currentDay.toISOString()}`)
    .then(res => generateBlockComponents(res.data))
    .then(blocks => setBlocks(blocks))
  }

  const checkAndUpdateWeek = () => {
    const currentSunday = getLastSunday(currentDay);
    if (currentWeek.getDate() !== currentSunday.getDate()) {
      console.log("new week!")
      setCurrentWeek(currentSunday);
      loadUserBlocks();
    }
  }

  // Load the current week's blocks any time the username changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(loadUserBlocks, [username]);

  // Check for a new week any time the current day changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(checkAndUpdateWeek, [currentDay])

  // Change currentDay by given number of days
  // i.e. days = 1 gives next day, days = -1 gives prev day
  const changeDay = days => {
    const msDayMultiplier = 1000*60*60*24;
    const deltaMs = msDayMultiplier*days;
    setCurrentDay(new Date(currentDay.valueOf() + deltaMs))
  }

  return [blocks, currentDay, changeDay];
}