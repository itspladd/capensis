import { makeTimeString, makeTimeIntervalString } from '../helpers/stringHelpers'

export default function SessionItem(props) {

  const { id, project_id, title, start_time, end_time } = props;

  const [h, m, s] = makeTimeIntervalString(start_time, end_time)

  return(
    <div className="sessionItem">
      <span>{title}</span>
      <span>{makeTimeString(start_time)} to {makeTimeString(end_time)}</span>
      <span>{h} hours, {m} {s}</span>
    </div>
  )
}