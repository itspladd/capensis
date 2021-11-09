import ListGroupItem from 'react-bootstrap/ListGroupItem'

import { makeDurationFromHHMM, makeWeekDayString, makeDateString, makeTimeString } from '../helpers/stringHelpers'

import STATUSES from '../constants/statuses'

import Button from 'react-bootstrap/Button'
import Loading from './Loading'

import '../styles/SessionItem.css'

const LANG = "EN-US"

export default function PureSessionItem(props) {
  const { status, title, start, end, refDay, changeTimes, submit, setStatus } = props;

  const duration = makeDurationFromHHMM(start, end);
  const weekday = makeWeekDayString(LANG, refDay);
  const date = makeDateString(LANG, refDay);

  // Statuses and their components
  const statusComponents = {
    stable: <Button variant="outline-secondary" size="sm" onClick={() => setStatus(STATUSES.EDITING)}>Edit</Button>,
    editing: (
      <>
        <Button onClick={submit} variant="success" size="sm" type="submit">Save</Button>
        <Button onClick={() => setStatus(STATUSES.STABLE)} variant="danger" size="sm" >Cancel</Button>
      </>
    ),
    submitting: <Loading iconOnly>Saving...</Loading>,
    success: <div className="success-icon"><span className="visually-hidden">Success!</span></div>,
    failure: "Submit failed."
  }
  console.log(start)

  return (
    <ListGroupItem as="a" className={`session-item ${status}`}>
      <div className="session-item-content">
        {title && <strong className="session-item-title">{title}</strong>}
        <div className="session-item-date">
            <strong>{weekday}</strong>
            <span className="text-muted">{date}</span>
        </div>
        <div className="session-item-time">
          {/* If we're in the editing status, show the form. Otherwise, just display the times. */}
          {status === STATUSES.EDITING ?
            <form>
              <fieldset>
                <label  htmlFor="start">Start</label>
                <input id="start" type="time" onChange={changeTimes} value={start}/>
              </fieldset>
              <fieldset>
                <label htmlFor="end">End</label>
                <input id="end" type="time" onChange={changeTimes} value={end}/>
                <span className="text-muted">({duration})</span>
              </fieldset>
            </form>
            :
            <div>
              <span>{makeTimeString(start)} to {makeTimeString(end)}</span>
              <span className="text-muted">({duration})</span>
            </div>
          }
        </div>
      </div>
      <div className={`session-item-status ${status}`}>
        {statusComponents[status]}
      </div>
  </ListGroupItem>)}