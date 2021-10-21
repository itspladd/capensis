import '../styles/ScheduleBar.css'

export default function ScheduleBar(props) {

  const startHour = 6;
  const endHour = 20;

  const ScheduleBarSection = props => {
    const { hour } = props;
    const am = hour < 12;
    return (
      <li className="ScheduleBarSection"
        key={hour}>
        { am || hour === 12 ? hour : hour-12 }:00 { am ? "AM" : "PM"}
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
      .map((e, index) => <ScheduleBarSection hour={start + index} />);
    return sections;
  }

  return (
    <ul className="ScheduleBar">
      {makeScheduleElements(startHour, endHour)}
    </ul>
  )
}