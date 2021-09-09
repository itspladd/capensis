import axios from 'axios';
import '../styles/Block.css'

export default function Block(props) {
  const { title, project_id, length, day, start_time, end_time } = props;

  const startTimeStr = new Date(start_time).toLocaleTimeString();
  const endTimeStr = new Date(end_time).toLocaleTimeString();

  return(
    <div className="block"
      projectid={project_id}
    >
      <h5>{title}</h5>
      <ul>
        <li>From: {startTimeStr} to {endTimeStr}</li>
      </ul>
    </div>
  )
}