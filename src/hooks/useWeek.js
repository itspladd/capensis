import { useState, useEffect } from 'react';
import { getLastSunday } from '../helpers/timeHelpers'

export default function useWeek(day) {
  const [weekMs, setWeekMs] = useState(getLastSunday(day).valueOf());

  useEffect(() => {
    setWeekMs(getLastSunday(day).valueOf());
  }, [day])

  return [weekMs];
}