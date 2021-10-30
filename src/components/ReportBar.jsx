import '../styles/ReportBar.css';


export default function ReportBar(props) {
  const {color, progress, goal} = props

  const getPercentage = (num, denom) => {
    const percent = (num/denom) * 100;
    return Math.round(percent*1000) / 1000;
  }

  const style = {
    backgroundColor: color
  }

  return (
    <div className="reportBar" style={style}>
      <div className="reportBar-inner">{getPercentage(progress, goal)}</div>
    </div>
  )
}