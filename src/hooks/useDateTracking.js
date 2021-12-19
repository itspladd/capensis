import { useState, useEffect } from 'react';
import { makeNoonDate, getLastSunday } from '../helpers/timeHelpers'

export default function useDateTracking() {
  const today = new Date();
  makeNoonDate(today);

  const [day, setDay] = useState(today);
  const [weekMs, setWeekMs] = useState(getLastSunday(day).valueOf());

  // Change currentDay by given number of days
  // i.e. days = 1 gives next day, days = -1 gives prev day
  // Check for new week and load new blocks if necessary.
  const changeDay = days => {
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