
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
