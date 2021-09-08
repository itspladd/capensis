import Block from './Block'

export default function BlockList(props) {
  const { blocks, day } = props;

  const blocksForDay = blocks.filter(block => {
    return new Date(block.start_time).getDate() === day.getDate();
    })
    .map(block => (
      <Block
        {...block}
        day={new Date(block.start_time)}
      />
    ))

  return (
    <div className="blockList">
      { blocksForDay }
    </div>
  )
}