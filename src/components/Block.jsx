export default function Block(props) {
  const { title, schedule_date, start_time, end_time } = props;

  return(
    <div>
      <h3>{title}</h3>
      <ul>
        <li>Day: {schedule_date}</li>
        <li>Starts at: {start_time}</li>
        <li>Ends at: {end_time}</li>
      </ul>
    </div>
  )
}