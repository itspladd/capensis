import { makeTimeString, makeWeekDayString, makeDateString, makeShortDateString, makeShortWeekdayString } from '../helpers/stringHelpers'
import { getTimeIntervalUnits } from '../helpers/timeHelpers'

import '../styles/SessionItem.css'

import ListGroupItem from 'react-bootstrap/ListGroupItem'
import Button from 'react-bootstrap/Button'

import useControlledForms from '../hooks/useControlledForms'

import classNames from 'classnames';
import { useEffect } from 'react'

const LANG = 'EN-US'

export default function SessionItem(props) {
  const { title, formTimes, handleChange, handleSubmit, start_time, end_time, editing, edit, submitting, success } = props;

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
    const h = endH - startH;
    const m = endM - startM;
    const hours = h ? `${h}h ` : '';
    const mins = `${m}m `
    return hours + mins
  }


  const stable = !submitting && !editing;

  const className = classNames('session-item', {
    submitting,
    success
  })

  const status = "stable";
  const statusComponent = {
    stable: <Button variant="outline-secondary" size="sm" onClick={edit}>Edit</Button>,
    submitting: "Submitting...",
    success: "Success!",
    failure: "Submit failed."
  }


  return(
    <ListGroupItem as="a" className={className}>
      <div className="session-item-content">
        {title && <strong className="session-item-title">{title}</strong>}
        <div className="session-item-date">
            <strong>{makeWeekDayString(LANG, start_time)}</strong>
            <span>{makeDateString(LANG, start_time)}</span>
        </div>
        <div className="session-item-time">
          {stable &&
            <>
            <div>
              <span>{makeTimeString(start_time)} to {makeTimeString(end_time)}</span>
              <span className="text-muted"> ({makeDurationFromTimestamps(start_time, end_time)})</span>
            </div>
            </>
          }
          {editing &&
            <form className="session-item__form" onSubmit={handleSubmit}>
              <label className="visually-hidden" htmlFor="start_time">Starting time</label>
              <input id="start_time" type="time" onChange={handleChange} value={formTimes.start_time} />
              <span> to </span>
              <label className="visually-hidden" htmlFor="end_time">Ending time</label>
              <input id="end_time" type="time" onChange={handleChange} value={formTimes.end_time} />
              <span className="text-muted"> ({makeDurationFromHHMM(formTimes.start_time, formTimes.end_time)})</span>
              <button type="submit">Submit</button>
            </form>
          }
          {submitting &&
            <>
            <div>
              <span>{makeTimeString(submitting.start_time)} to {makeTimeString(submitting.end_time)}</span>
              <span className="text-muted"> ({makeDurationFromHHMM(submitting.start_time, submitting.end_time)})</span>
            </div>
            <span className="submit-message">Submitting...</span>
            </>
          }
        </div>
      </div>
        <div className="session-item-status">
          {statusComponent[status]}
        </div>
    </ListGroupItem>
  )
}