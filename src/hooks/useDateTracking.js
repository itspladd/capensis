import { useState, useEffect } from 'react';
import { makeNoonDate, getLastSunday } from '../helpers/timeHelpers'

/**
 * Keeps track of day and week in the state.
 * Initializes to noon on the current day.
 * @returns {[Date, number, changeDay]}
 */
export default function useDateTracking() {
  const today = new Date();
  makeNoonDate(today);

  const [day, setDay] = useState(today);
  const [weekMs, setWeekMs] = useState(getLastSunday(day).valueOf());

  /**
   * Changes the current day by the input number of days.
   * Use a negative number to move to a previous day.
   * Use a positive number to move to a future day.
   * @param {number} days
   */
  function changeDay(days) {
    const msDayMultiplier = 1000*60*60*24;
    const deltaMs = msDayMultiplier*days;
    const newDay = new Date(day.valueOf() + deltaMs);

    setDay(newDay)
  }

  useEffect(() => {
    setWeekMs(getLastSunday(day).valueOf());
  }, [day])

  return [day, weekMs, changeDay];
}