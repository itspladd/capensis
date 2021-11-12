import '../styles/ScheduleBar.css'
import { amOrPm } from '../helpers/stringHelpers'
import { to12H } from '../helpers/timeHelpers'

export default function ScheduleBar(props) {

  const startHour = 0;
  const endHour = 24;

  const ScheduleBarSection = props => {
    const { hour } = props;
    return (
      <li className="ScheduleBarSection list-group-item text-muted"
        key={hour}>
        { to12H(hour) }{ amOrPm(hour)}
      </li>
    )
  }

  /* Creates the divs that show time of day for a schedule.
  start: int, first hour of the schedule
  end: int, last hour of the schedule
  */
  const  makeScheduleElements = (start, end) => {
    const numSections = end - start;
    const sections = new Array(numSections)
      .fill(undefined) // Gotta do this first, or .map won't actually do anything
      .map((e, index) => <ScheduleBarSection key={index} hour={start + index} />);
    return sections;
  }

  return (
    <ul className="ScheduleBar list-group list-group-flush">
      {makeScheduleElements(startHour, endHour)}
    </ul>
  )
}