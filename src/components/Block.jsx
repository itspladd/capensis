import '../styles/Block.css'
import { makeTimeString } from '../helpers/stringHelpers'

export default function Block(props) {
  const { title, project_id, length, day, start_time, end_time } = props;

  const startTimeStr = makeTimeString(start_time)
  const endTimeStr = makeTimeString(end_time)


  return(
    <li className="block list-group-item"
      projectid={project_id}
    >
      <h5>{title}</h5>
      {startTimeStr} to {endTimeStr}
    </li>
  )
}