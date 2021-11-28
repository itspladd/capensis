/**
 * Returns true if the input is a truthy value or an array or object with length > 0.
 * @param {*} a The value you to check.
 * @returns {boolean} True if a is truthy or is an array/object with length > 0, false otherwise.
 */
export function truthyOrLengthy(a) {
  // If falsy, return false.
  if (!a) return false;
  // If array, check its length.
  if (Array.isArray(a)) return a.length > 0;
  // If object, check the number of values.
  if (typeof a === 'object') return Object.values(a).length > 0;

  // If it's not falsy and it's not an array or object, return true.
  return true;
}