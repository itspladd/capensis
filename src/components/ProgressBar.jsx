export default function ProgressBar(props) {
  const { color, style, percent, overfilled } = props;

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
    <div className={`progressbar-outer ${style} ${overfilled && 'overfilled'}`}
         style={outerBarStyle}>
      <div className={'progressbar-inner'}
        style={innerBarStyle}>
        </div>
    </div>
  )
}