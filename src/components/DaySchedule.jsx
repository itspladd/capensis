import '../styles/DaySchedule.css';

import Button from 'react-bootstrap/Button';
import BlockList from './BlockList'

export default function DaySchedule(props) {

  // Props:
  // blocks is an array of Block components.
  const { blocks, day, tomorrow, yesterday, showForm } = props;

  const dayString = day && day.toDateString();

  return(
    <div className="daySchedule">
      <h3>{dayString}</h3>
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