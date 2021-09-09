import Block from './Block'

export default function BlockList(props) {
  const { blocks, day } = props;

  const getFifteenMinuteUnits = (start, end) => {
    const lengthMs = new Date(end) - new Date(start);
    const lengthMins = lengthMs / 1000 / 60;
    const fifteenMinuteUnits = lengthMins / 15;
    return fifteenMinuteUnits;
  }

  const blocksForDay = blocks.filter(block => {
    return new Date(block.start_time).getDate() === day.getDate();
    })
    .map(block => (
      <Block
        {...block}
        day={new Date(block.start_time)}
        length={getFifteenMinuteUnits(block.start_time, block.end_time)}
      />
    ))

  return (
    <div className="blockList">
      { blocksForDay }
    </div>
  )
}