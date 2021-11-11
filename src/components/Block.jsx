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

  const blockClass = classNames("block", "list-group-item", {
    spacer,
    project: !spacer,
    short: length === 1,
    "hour-end": spacer &&
                getHM(end_time)[1] === 0, // if we're a spacer and end-time minutes are 0
    "hour-start": spacer &&
                getHM(start_time)[1] === 0,
  });

  return(
    <li
      id={id}
      className={blockClass}
      style={{height: lengthStr}}
      projectid={project_id}
    >
        {!spacer &&
        <div className={"block-body"}>
          <p>{title}</p>
          <span className="text-muted">{interval}</span>
        </div>
        }
    </li>
  )
}