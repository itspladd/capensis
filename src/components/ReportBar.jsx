import '../styles/ReportBar.css';

import Color from 'colorjs.io';


export default function ReportBar(props) {
  const {color="#1034A6", progress, goal} = props
  const barColor = new Color(color);
  const barBackground = new Color(color);
  barBackground.alpha = .25; // Lighten the background color

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

  // Is the bar color relatively light or dark?
  const colorType = barColor.lightness > 30 ? "light" : "dark"

  const outerBarStyle = {
    backgroundColor: `${barBackground.toString()}`
  }

  const innerBarStyle = {
    backgroundColor: barColor.toString(),
    width: `${innerWidth}%`
  }

  return (
    <div className="reportBar" style={outerBarStyle}>
      <div className={`reportBar-inner ${colorType}`}
        style={innerBarStyle}>
        </div>
    </div>
  )
}
