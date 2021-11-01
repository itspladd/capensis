import '../styles/ReportItem.css';

import ProgressBar from './ProgressBar'

import COLORS from '../constants/colors'

// Helpers
import { percent, fudgePercentage } from '../helpers/numberHelpers'

export default function ReportItem(props) {
  const {color = COLORS.EGYPT_BLUE, title, progress, goal} = props

  const style = color.lightness > 30 ? "light" : "dark";

  const overfilled = progress > goal;

  const rawWidth = overfilled ? percent(goal, progress) : percent(progress, goal);
  const progressPercent = `${fudgePercentage(rawWidth)}%`;

  const headerWidth = overfilled ? progressPercent : "100%";
  const footerWidth = overfilled ? "100%" : progressPercent;

  const projectStyle = {
    backgroundColor: color.toString(),
    color: color.toString(),

  }

  return (
    <div className={`report-item ${style} ${overfilled && 'overfilled'}`}>
      <div className="report-item-header" style={{width: headerWidth}}>
        <p className="report-item-project" style={projectStyle}><strong>{title}</strong></p>
        <p className="report-item-goal"><small><strong>Goal:</strong> {goal} hours</small></p>
      </div>
      <ProgressBar color={color} overfilled style={style} percent={progressPercent} />
      <p className="report-item-footer" style={{width: footerWidth}}>
        <small><strong>Tracked:</strong> {progress} hours</small>
      </p>
    </div>
  )
}
