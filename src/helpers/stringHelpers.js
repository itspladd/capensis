import { getLastSunday, getNextSaturday, getTimeIntervalUnits } from './timeHelpers'

export function makeTimeString(time) {
  return new Date(time).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit'});
}

export function makeTimeIntervalString(start, end, options) {
  const { hours, minutes, seconds } = options;
  const [h, m, s] = getTimeIntervalUnits(start, end)

  if (seconds) {}
  return [h, m, s]
}

export function makeWeekDayString(lang, time) {
  if (!lang || !time) {
    return "";
  }
  return new Date(time).toLocaleDateString(lang, { weekday: 'long' });
}

export function makeDateString(lang, time) {
  if (!lang || !time) {
    return "";
  }
  return new Date(time).toLocaleDateString(lang, { month: 'long', year: 'numeric', day:'numeric' });
}

export function makeWeekString(lang, time) {
  if (!lang || !time) {
    return "";
  }
  const sun = getLastSunday(time);
  const sat = getNextSaturday(time);

  const sunStr = sun.toLocaleDateString(lang, { month: 'long', day:'numeric' });
  const satStr = sat.toLocaleDateString(lang, { month: 'long', day: 'numeric' });

  return(`${sunStr} – ${satStr}`)
}