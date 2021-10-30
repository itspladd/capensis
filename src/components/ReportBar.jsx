import '../styles/ReportBar.css';

import Color from 'colorjs.io';
import classNames from 'classnames';

// Helpers
import { percent, fudgePercentage } from '../helpers/numberHelpers'

export default function ReportBar(props) {
  const {color="#1034A6", title, progress, goal} = props

  const barColor = new Color(color);
  const barBackground = new Color(color);

  const overfilled = progress > goal;

  barBackground.alpha = overfilled ? 1 : .25; // Lighten the background color

  const innerWidth = () => {
    const percentWidth = overfilled ? percent(goal, progress) : percent(progress, goal);
    return fudgePercentage(percentWidth);
  };
  const innerBarWidth = `${innerWidth()}%`;

  const headerWidth = overfilled ? innerBarWidth : "100%";
  const footerWidth = overfilled ? "100%" : innerBarWidth;


  const outerBarStyle = {
    backgroundColor: `${barBackground.toString()}`
  }

  const innerBarStyle = {
    backgroundColor: barColor.toString(),
    width: innerBarWidth
  }

  const outerBarClass = classNames("reportBar", {
    overfilled
  });

  const innerBarClass = classNames("reportBar-inner", {
    light: barColor.lightness > 30,
    dark: barColor.lightness <= 30,
    overfilled
  })

  return (
    <div className="report-item">
      <div className="report-item-header">
        <div className="report-item-header__spacer" style={{width: headerWidth}}>
          <p>{title}</p>
          <p>Target: {goal} hours</p>
        </div>
      </div>
      <div className={outerBarClass} style={outerBarStyle}>
        <div className={innerBarClass}
          style={innerBarStyle}>
          </div>
      </div>
      <p className="report-item-footer" style={{width: footerWidth}}>
        Tracked: {progress} hours
      </p>
    </div>
  )
}
