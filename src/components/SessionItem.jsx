import { makeTimeString, makeWeekDayString, makeDateString, makeShortDateString, makeShortWeekdayString } from '../helpers/stringHelpers'
import { getTimeIntervalUnits } from '../helpers/timeHelpers'

import '../styles/SessionItem.css'

import ListGroupItem from 'react-bootstrap/ListGroupItem'
import Button from 'react-bootstrap/Button'

import classNames from 'classnames';

const LANG = 'EN-US'

export default function SessionItem(props) {
  const { title, formTimes, handleChange, handleSubmit, start_time, end_time, submitTimes, status, edit, cancel } = props;

  const makeDurationFromTimestamps = (start, end) => {
    const [h, m, s] = getTimeIntervalUnits(start, end)
    const hours = h ? `${h}h ` : '';
    const mins = `${m}m `
    const secs = `${s}s`
    return hours + mins + secs;
  }

  const makeDurationFromHHMM = (start, end) => {
    // Get numbers from HH:MM strings
    const [startH, startM] = start.split(':').map(str => Number(str))
    const [endH, endM] = end.split(':').map(str => Number(str))
    let h = endH - startH;
    let m = endM - startM;
    // Account for negative minutes value
    // e.g. 2h -40m becomes 1h 20m (same number of minutes but in normal time terms)
    if (m < 0) {
      h--;
      m += 60;
    }
    const hours = h ? `${h}h ` : '';
    const mins = `${m}m`
    return hours + mins
  }

  const className = classNames('session-item', {
    [status]: true
  })

  const statusComponent = {
    stable: <Button variant="outline-secondary" size="sm" onClick={edit}>Edit</Button>,
    editing: (
      <>
        <Button form="session-item__form" variant="success" size="sm" type="submit">Save</Button>
        <Button onClick={cancel} variant="danger" size="sm" >Cancel</Button>
      </>
    ),
    submitting: "Submitting...",
    success: "Success!",
    failure: "Submit failed."
  }

  // Statuses and their components

  return(
    <ListGroupItem as="a" className={className}>
      <div className="session-item-content">
        {title && <strong className="session-item-title">{title}</strong>}
        <div className="session-item-date">
            <strong>{makeWeekDayString(LANG, start_time)}</strong>
            <span className="text-muted">{makeDateString(LANG, start_time)}</span>
        </div>
        <div className="session-item-time">
          {status === "stable" &&
            <>
            <div>
              <span>{makeTimeString(start_time)} to {makeTimeString(end_time)}</span>
              <span className="text-muted"> ({makeDurationFromTimestamps(start_time, end_time)})</span>
            </div>
            </>
          }
          {status === "editing" &&
            <form className="session-item__form" onSubmit={handleSubmit}>
              <fieldset>
                <label htmlFor="start_time">Start</label>
                <input id="start_time" type="time" onChange={handleChange} value={formTimes.start_time} max={formTimes.end_time} />
              </fieldset>
              <fieldset>
                <label htmlFor="end_time">End</label>
                <input id="end_time" type="time" onChange={handleChange} value={formTimes.end_time} min={formTimes.start_time}/>
              </fieldset>
              <span className="text-muted"> ({makeDurationFromHHMM(formTimes.start_time, formTimes.end_time)})</span>
            </form>
          }
          {status === "submitting" &&
            <>
            <div>
              <span>{makeTimeString(submitTimes.start_time)} to {makeTimeString(submitTimes.end_time)}</span>
              <span className="text-muted"> ({makeDurationFromHHMM(submitTimes.start_time, submitTimes.end_time)})</span>
            </div>
            <span className="submit-message">Submitting...</span>
            </>
          }
        </div>
      </div>
        <div className={`session-item-status ${status}`}>
          {statusComponent[status]}
        </div>
    </ListGroupItem>
  )
}