import '../styles/Block.css'
import { makeTimeString, makeShortIntervalString } from '../helpers/stringHelpers'

export default function Block(props) {
  const { title, project_id, length, start_time, end_time } = props;

  const interval = makeShortIntervalString(start_time, end_time);

  // Is this block a placeholder?
  const placeholder = project_id === -1;

  const blockClass = placeholder ? "block_placeholder" : "block"
  const backgroundClass = placeholder ? "block_placeholder_background" : "block_background"
  const lengthStr = placeholder ? "1rem" : `${length}rem`
  return(
    <li className={"list-group-item " + backgroundClass}
      style={{height: lengthStr}}
    >
      <div
        className={blockClass}
        projectid={project_id}
      >
        {!placeholder && <h5>{title}</h5>}
        {interval}
      </div>
    </li>
  )
}