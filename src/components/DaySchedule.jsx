import '../styles/DaySchedule.css';

import Button from 'react-bootstrap/Button';
import BlockList from './BlockList'

export default function DaySchedule(props) {

  // Props:
  // blocks is an array of Block components.
  const { blocks, day, tomorrow, yesterday, showForm } = props;
  const dayMap = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday"
  }

  return(
    <div className="daySchedule">
      <h3>{day.toDateString()}</h3>
      <Button variant="primary" onClick={showForm}>
        Make a new block
      </Button>
        <div className="dayScheduleInternal mt-2">
          <button 
            className="btn btn-primary"
            onClick={yesterday}>{`<--`}</button>
          <BlockList 
            blocks={blocks}
            day={day}
          />
          <button 
            className="btn btn-primary"
            onClick={tomorrow}>
              {`-->`}
          </button>
      </div>
    </div>
  )
}