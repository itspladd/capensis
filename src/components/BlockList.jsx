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
    <ul className="blockList list-group ms-2 me-2">
      { blocksForDay }
    </ul>
  )
}