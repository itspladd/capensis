import '../styles/BlockList.css'
import Block from './Block'

import { getFifteenMinuteUnits } from '../helpers/timeHelpers'

export default function BlockList(props) {
  const { blocks, day } = props;

  const blocksForDay = blocks && day &&
    blocks
    .map(block => (
      <Block
        {...block}
        key={block.id}
        length={getFifteenMinuteUnits(block.start_time, block.end_time)}
      />
    ))

  return (
    <ul className="blockList list-group list-group-flush">
      { blocksForDay }
    </ul>
  )
}