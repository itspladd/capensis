export default function DaySchedule(props) {

  // Props:
  // blocks is an array of Block components.
  const { blocks, day, tomorrow, yesterday } = props;

  const blocksForDay = blocks.filter(block => {
    return block.props.day.getDate() === day.getDate();
  })

  return(
    <div>
      <p>
        <button onClick={yesterday}>Prev day</button>
        <span>DaySchedule component for {day.toISOString()}</span>
        <button onClick={tomorrow}>Next day</button>
      </p>
      {blocksForDay}
    </div>
  )
}