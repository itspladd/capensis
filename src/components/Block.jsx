import '../styles/Block.css'
import { makeTimeString } from '../helpers/stringHelpers'

export default function Block(props) {
  const { title, project_id, length, start_time, end_time } = props;

  const startTimeStr = makeTimeString(start_time)
  const endTimeStr = makeTimeString(end_time)

  // Is this block a placeholder?
  const placeholder = project_id === -1;

  const blockClass = placeholder ? "block_placeholder" : "block"

  return(
    <li className={blockClass + " list-group-item"}
      projectid={project_id}
      style={{height: length + "rem"}}
    >
      {!placeholder && <h5>{title}</h5>}
      {startTimeStr} to {endTimeStr}
    </li>
  )
}