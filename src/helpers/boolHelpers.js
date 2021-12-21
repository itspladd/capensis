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

/**
 * Recursively searches an object and its nested objects for any false boolean value.
 * @param {Object} data 
 * @returns {boolean} True if and only if all values in the input object and nested objects are true.
 */
export function allTrue(data) {
  for (const key in data) {
    const item = data[key]
    if (typeof item === 'object' && !allTrue(item)) {
      return false;
    }
    if (item === false) {
      return false;
    }
  }

  return true;
}