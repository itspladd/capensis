import Block from './Block'

import { getFifteenMinuteUnits } from '../helpers/timeHelpers'

export default function BlockList(props) {
  const { blocks, day } = props;

  

  const blocksForDay = blocks && day &&
    blocks
    .filter(block => new Date(block.start_time).getDate() === day.getDate())
    .map(block => (
      <Block
        {...block}
        key={block.id}
        day={new Date(block.start_time)}
        length={getFifteenMinuteUnits(block.start_time, block.end_time)}
      />
    ))

  return (
    <ul className="blockList list-group ms-2 me-2">
      { blocksForDay }
    </ul>
  )
}