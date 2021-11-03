
const msDayMultiplier = 1000*60*60*24;

// Given a Date object, return a Date object of the last Sunday.
export function getLastSunday(date) {
  // Get Sunday for this week.
  const daysSinceSunday = date.getDay(); // Returns 0 for sunday, 1 for Monday, etc
  const msSinceSunday = msDayMultiplier * daysSinceSunday;
  const lastSundayMs = date.valueOf() - msSinceSunday;
  return new Date(lastSundayMs);
}

export function getNextSaturday(date) {
  const daysUntilSaturday = 6 - date.getDay();
  const msUntilSaturday = msDayMultiplier * daysUntilSaturday;
  const nextSaturdayMs = date.valueOf() + msUntilSaturday;
  return new Date(nextSaturdayMs);
}

// Set h/min/s/ms of a given date to 0.
export function makeZeroDate(date) {
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
}

export function makeNoonDate(date) {
  date.setHours(12);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
}

export function minutesSinceMidnight (hours, minutes) {
  return (hours * 60) + minutes;
}

// Internal helper function to allow getBoundaryMinutes to handle different options
function getFormValuesBoundaryMinutes(values) {
  const startHours = Number(values.startHour) + Number(values.startAMPM);
  const startMinutes = Number(values.startMinute)
  const endHours = Number(values.endHour) + Number(values.endAMPM);
  const endMinutes = Number(values.endMinute)
  const startMins = minutesSinceMidnight(startHours, startMinutes);
  const endMins = minutesSinceMidnight(endHours, endMinutes);
  return [startMins, endMins]
}

function getBlockBoundaryMinutes(block) {
  const start = new Date(block.start_time);
  const end = new Date(block.end_time);
  const startMins = minutesSinceMidnight(start.getHours(), start.getMinutes())
  const endMins = minutesSinceMidnight(end.getHours(), end.getMinutes())
  return [startMins, endMins]
}

export function getBoundaryMinutes({values, block}) {
  if (values) return getFormValuesBoundaryMinutes(values);
  if (block) return getBlockBoundaryMinutes(block)
}

export function getFifteenMinuteUnits(start, end) {
  const lengthMs = new Date(end) - new Date(start);
  const lengthMins = lengthMs / 1000 / 60;
  const fifteenMinuteUnits = lengthMins / 15;
  return fifteenMinuteUnits;
}

// Determines if a block's start_time date matches the input date.
export function blockIsOnDay(block, day) {
  return new Date(block.start_time).getDate() === day.getDate();
}