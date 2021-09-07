export default function BlockList(props) {
  const { blocks, day } = props;

  const blocksForDay = blocks.filter(block => {
    return block.props.day.getDate() === day.getDate();
  })

  return (
    <div className="blockList">
      { blocksForDay }
    </div>
  )
}