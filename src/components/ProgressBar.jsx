import '../styles/ReportItem.css'
import '../styles/ProgressBar.css'

export default function ProgressBar(props) {
  const { color, style, percent, overfilled } = props;
  const overfilledStr = overfilled ? 'overfilled' : '';
  const background = color.clone();
  background.alpha = .25; // Lighten the background color

  const outerBarStyle = {
    backgroundColor: `${background.toString()}`
  }

  const innerBarStyle = {
    backgroundColor: color.toString(),
    width: percent
  }

  return (
    <div className={`progressbar-outer ${style} ${overfilledStr}`}
         style={outerBarStyle}>
      <div className={`progressbar-inner ${style} ${overfilledStr}`}
        style={innerBarStyle}>
        </div>
    </div>
  )
}