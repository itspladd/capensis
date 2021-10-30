import '../styles/ReportBar.css';


export default function ReportBar(props) {
  const {color, progress, goal} = props

  const getPercentage = (num, denom) => {
    const percent = (num/denom) * 100;
    return Math.round(percent*1000) / 1000;
  }

  const outerBarStyle = {
    backgroundColor: `${color}66`
  }

  const innerBarStyle = {
    backgroundColor: color,
    width: `${getPercentage(progress, goal) || 1}%`
  }

  return (
    <div className="reportBar" style={outerBarStyle}>
      <div className="reportBar-inner"
        style={innerBarStyle}>

        </div>
    </div>
  )
}