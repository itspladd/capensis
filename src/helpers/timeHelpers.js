
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

export function getTimeIntervalUnits(start, end) {
  const startMs = new Date(start).valueOf();
  const endMs = new Date(end).valueOf();
  const ms = endMs - startMs;
  const sRemaining = Math.floor(ms / 1000);
  const s = sRemaining % 60;
  const minsRemaining = (sRemaining - s) / 60;
  const m = minsRemaining % 60;
  const h = (minsRemaining - m) / 60;

  return [h, m, s]
}

export function getHM24(time) {
  const obj = new Date(time);
  let h, m;
  h = obj.getHours();
  m = obj.getMinutes();
  return [h, m];
}

/**
 * Returns the hour, minute, and offset for the input time in 12h format.
 * @param {*} time The time to convert
 * @param {Boolean} noonZero (optional) Indicates if noon should be returned as a zero value with a 12-hour offset
 * @returns {Array} The hour, minute, and offset (0 for AM, 12 for PM)
 */
export function getHMO12(time, noonZero) {
  const obj = new Date(time);
  const h24 = obj.getHours();
  let h, m, hOffset;
  h = to12H(h24);
  m = obj.getMinutes();
  hOffset = h24 > 12 ? 12 : 0;
  if (noonZero && h24 === 0) {
    return [0, m, 0]
  }
  if (noonZero && h24 === 12) {
    return [0, m, 12];
  }
  return [h, m, hOffset];
}



// Turn an arbitrary number of input arguments to their 12h versions
export function to12H() {
  const result = Array.from(arguments).map(hour => {
    if (hour === 0) {
      return 12;
    }
    if (hour > 12) {
      return hour - 12;
    }
    return hour
  })

  return result.length === 1 ? result[0] : result;
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
  const startDate = new Date(start);
  const endDate = new Date(end);
  const lengthHours = endDate.getHours() - startDate.getHours();
  const lengthMins = (endDate.getMinutes() - startDate.getMinutes()) + (lengthHours * 60)
  const fifteenMinuteUnits = lengthMins / 15;
  return fifteenMinuteUnits;
}

// Determines if a block's start_time date matches the input date.
export function blockIsOnDay(block, day) {
  return new Date(block.start_time).getDate() === day.getDate();
}

export function timeStringSorter(timeStr1, timeStr2) {
  const ms1 = new Date(timeStr1).valueOf()
  const ms2 = new Date(timeStr2).valueOf()
  return ms1 - ms2;
}