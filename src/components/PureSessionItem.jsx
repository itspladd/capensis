import { forwardRef } from 'react'
import ListGroupItem from 'react-bootstrap/ListGroupItem'

import { makeDurationFromHHMM, makeWeekDayString, makeDateString, makeTimeString } from '../helpers/stringHelpers'

import STATUSES from '../constants/statuses'

import Button from 'react-bootstrap/Button'
import Loading from './Loading'
import SuccessIcon from './SuccessIcon'

import '../styles/SessionItem.css'

const LANG = "EN-US"

const PureSessionItem = forwardRef((props, ref) => {
  const {
    status,
    id,
    title,
    start,
    end,
    refDay,
    changeTimes,
    submit,
    deleteItem,
    setStatus,
  } = props;

  const duration = makeDurationFromHHMM(start, end);
  const weekday = makeWeekDayString(LANG, refDay);
  const date = makeDateString(LANG, refDay);

  // Statuses and their components
  const statusComponents = {
    stable: (
      <>
      <Button variant="outline-secondary" size="sm" onClick={() => setStatus(STATUSES.EDITING)}>Edit</Button>
      <Button variant="outline-danger" size="sm" onClick={deleteItem}>Delete</Button>
      </>
    ),
    editing: (
      <>
        <Button onClick={submit} variant="success" size="sm" type="submit">Save</Button>
        <Button onClick={() => setStatus(STATUSES.STABLE)} variant="danger" size="sm" >Cancel</Button>
      </>
    ),
    submitting: <Loading iconOnly>Saving...</Loading>,
    deleting: "",
    success: <SuccessIcon />,
    failure: "Submit failed."
  }

  return (
    <ListGroupItem as="a" href={`#${id}`} className={`session-item ${status}`}>
      <div ref={ref} className="session-item-content">
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
            <>
              <span>{makeTimeString(start)} to {makeTimeString(end)}</span>
              <span className="text-muted">({duration})</span>
            </>
          }
        </div>
      </div>
      <div className={`session-item-status ${status}`}>
        {statusComponents[status]}
      </div>
  </ListGroupItem>)})

  export default PureSessionItem;