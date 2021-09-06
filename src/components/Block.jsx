export default function Block(props) {
  const { project_id, schedule_date, start_time, end_time } = props;

  return(
    <div>
      <h3>Block for project {project_id}</h3>
      <ul>
        <li>Day: {schedule_date}</li>
        <li>Starts at: {start_time}</li>
        <li>Ends at: {end_time}</li>
      </ul>
    </div>
  )
}