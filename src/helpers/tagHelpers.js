export function makeErrorTag(errorString, index) {
  return (
  <li key={`e${index}`} className="form-text text-muted">
    <small>{ errorString }</small>
  </li>
  )
}

/**
 *  Returns a nested <ul> structure from an array of errors, which can also contain arrays of sub-errors.
 * @param {Array} errors A list of errors to turn into a single <ul> element.
 * @param {String} header The header text for the error list or sub-list.
 * @param {Boolean} recursive Do not set.
 */
export const makeErrorList = function(errors, header) {
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
  const starter = () => makeErrorListRecurs(errors, header)
  return starter;
}();