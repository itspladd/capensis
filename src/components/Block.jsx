import '../styles/Block.css'
import classNames from 'classnames'
import { makeShortIntervalString } from '../helpers/stringHelpers'
import { getHM } from '../helpers/timeHelpers'

export default function Block(props) {
  const { id, title, project_id, length, start_time, end_time } = props;

  const interval = makeShortIntervalString(start_time, end_time);

  // Is this block a placeholder?
  const spacer = project_id === -1;

  const lengthStr = spacer ? "1rem" : `${length}rem`
  const projectFontSize = length > 1 ? "1rem" : ".6rem"
  const intervalFontSize = length > 1 ? ".8rem" : ".6rem"

  const blockClass = classNames("block", "list-group-item", {
    spacer,
    "hour-line": spacer && !getHM(end_time)[1], // if we're a spacer and end-time minutes are 0
    short: length === 1,
  });

  return(
    <li
      id={id}
      className={blockClass}
      style={{height: lengthStr, fontSize: projectFontSize}}
      projectid={project_id}
    >
        {!spacer &&
        <>
          <p>{title}</p>
          <span className="text-muted" style={{ fontSize: intervalFontSize}}>{interval}</span>
        </>
        }
    </li>
  )
}