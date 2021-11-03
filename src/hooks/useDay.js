import { useState } from 'react';
import { makeZeroDate } from '../helpers/timeHelpers'

export default function useDay() {
  const today = new Date();
  makeZeroDate(today);

  const [day, setDay] = useState(today);

  // Change currentDay by given number of days
  // i.e. days = 1 gives next day, days = -1 gives prev day
  // Check for new week and load new blocks if necessary.
  const changeDay = days => {
    const msDayMultiplier = 1000*60*60*24;
    const deltaMs = msDayMultiplier*days;
    const newDay = new Date(day.valueOf() + deltaMs);

    setDay(newDay)
  }

  return [day, changeDay];
}