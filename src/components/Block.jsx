import axios from 'axios';
import '../styles/Block.css'

export default function Block(props) {
  const { title, project_id, day, start_time, end_time } = props;


  return(
    <div className="block"
      projectid={project_id}
    >
      <h5>{title}</h5>
      <ul>
        <li>Day: {day.toLocaleString()}</li>
        <li>Starts at: {start_time}</li>
        <li>Ends at: {end_time}</li>
      </ul>
    </div>
  )
}