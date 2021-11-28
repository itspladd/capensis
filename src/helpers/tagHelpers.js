export function makeErrorTag(errorString, index) {
  return (
  <li key={`e${index}`} className="form-text text-muted">
    <small>{ errorString }</small>
  </li>
  )
}

/**
 *  Returns a nested <ul> structure from an array of errors, which can also contain arrays of sub-errors.
 * @param {Array} e A list of errors to turn into a single <ul> element.
 * @param {String} h The header text for the error list or sub-list.
 * @param {Boolean} recursive Do not set.
 */
export const makeErrorList = function() {
  const makeErrorListRecurs = (errors, header, recursive) => {
    return (
      <>
        {!recursive && <small>{header}</small>}
        { recursive && makeErrorTag(header)}
        <ul className="errorList">
          { errors.map((e, i) => {
            if(Array.isArray(e)) return makeErrorListRecurs(e.slice(1), e[0], true);
            return makeErrorTag(e,i);
          })}
        </ul>
      </>
    )
  }
  const starter = (e, h) => makeErrorListRecurs(e, h)
  return starter;
}();

/**
 * Creates drop-down option tags for the hours of the day
 */
export function makeHoursOptions() {
  const optionsList = [];
  for(let hour = 1; hour <= 12; hour++) {
    // The 12 hour should display as 12, but has a value of 0 for time calculations.
    // The PM value accounts for the 12-hour offset for noon.
    // (i.e. 12:00 AM is 00:00 (0 hours for '12' + 0 hours for 'AM'
    //  and 12:00 PM is 12:00 (0 hours for '12', 12 hours for 'PM'))
    optionsList.push(
      <option
        value={hour === 12 ? 0 : hour}
        key={hour === 12 ? 0 : hour}
      >
          {hour}
      </option>)
  }
  return optionsList;
}

/**
 * Creates a selectable drop-down list from an object of projects
 * @param {Object} projects
 */
export function makeProjectOptions(projects) {
  return Object.values(projects)
    .reverse()
    .map(project => (
      <option value={project.id} key={project.id}>{project.title}</option>
    ))
};