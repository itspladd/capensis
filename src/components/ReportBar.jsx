import '../styles/ReportBar.css';


export default function ReportBar(props) {
  const {color, progress, goal} = props

  const percent = (num, denom) => {
    const percent = (num/denom) * 100;
    return Math.round(percent*10) / 10;
  }

  // Fudge the numbers a bit for CSS width-niceness.
  const fudgePercentage = percent => {
    if (percent < 1) return 1;
    if (percent === 100) return 101;
    return percent
  }

  const innerWidth = fudgePercentage(percent(progress, goal));

  const outerBarStyle = {
    backgroundColor: `${color}66`
  }

  const innerBarStyle = {
    backgroundColor: color,
    width: `${innerWidth}%`
  }

  return (
    <div className="reportBar" style={outerBarStyle}>
      <div className="reportBar-inner"
        style={innerBarStyle}>
        </div>
    </div>
  )
}