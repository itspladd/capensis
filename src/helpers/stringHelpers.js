import { getLastSunday, getNextSaturday } from './timeHelpers'

// Gives time in H:MM AM/PM format, for humans to read.
export function makeTimeString(time) {
  return new Date(time).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit'})
}

// Give time in HH:MM without AM or PM.
export function makeHHMMTimeString(time) {
  return new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})
    .replace(" AM", "").replace(" PM", "");
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