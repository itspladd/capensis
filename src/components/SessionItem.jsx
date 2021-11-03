import { makeTimeString } from '../helpers/stringHelpers'
import { getTimeIntervalUnits } from '../helpers/timeHelpers'

export default function SessionItem(props) {

  const { id, project_id, title, start_time, end_time } = props;

  const [h, m, s] = getTimeIntervalUnits(start_time, end_time)

  const hours = h ? `${h}h` : '';
  const mins = `${m}m`
  const secs = `${s}s`

  return(
    <div className="sessionItem">
      <span>{title}</span>
      <span>{makeTimeString(start_time)} to {makeTimeString(end_time)}</span>
      <span>{hours} {mins} {secs}</span>
    </div>
  )
}