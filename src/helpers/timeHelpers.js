
const msDayMultiplier = 1000*60*60*24;

// Given a Date object, return a Date object of the last Sunday.
export function getLastSunday(date) {
// Get Sunday for this week.
const daysSinceSunday = date.getDay(); // Returns 0 for sunday, 1 for Monday, etc
const msSinceSunday = msDayMultiplier * daysSinceSunday;
const lastSundayMs = date.valueOf() - msSinceSunday;
return new Date(lastSundayMs);
}

// Set h/min/s/ms of a given date to 0.
export function makeZeroDate(date) {
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
}

export function minutesSinceMidnight (hours, minutes) {
  return (hours * 60) + minutes;
}

export function getBoundaryMinutes(values) {
  const startHours = Number(values.startHour) + Number(values.startAMPM);
  const startMinutes = Number(values.startMinute)
  const endHours = Number(values.endHour) + Number(values.endAMPM);
  const endMinutes = Number(values.endMinute)
  const startMins = minutesSinceMidnight(startHours, startMinutes);
  const endMins = minutesSinceMidnight(endHours, endMinutes);
  console.log(`getBoundaryMinutes found: ${startMins}, ${endMins}`);
  return [startMins, endMins]
}