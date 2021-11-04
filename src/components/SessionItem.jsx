import { makeTimeString, makeWeekDayString, makeDateString } from '../helpers/stringHelpers'
import { getTimeIntervalUnits } from '../helpers/timeHelpers'


import '../styles/SessionItem.css'

import ListGroupItem from 'react-bootstrap/ListGroupItem'

import useControlledForms from '../hooks/useControlledForms'

const LANG = 'EN-US'

export default function SessionItem(props) {
  const { title, formTimes, handleChange, start_time, end_time, editing, edit, saving } = props;

  const [h, m, s] = getTimeIntervalUnits(start_time, end_time)

  const hours = h ? `${h}h ` : '';
  const mins = `${m}m `
  const secs = `${s}s`

  const duration = hours + mins + secs;

  return(
    <ListGroupItem className="session-item" action onClick={edit}>
        <strong className="session-item-title">{title}</strong>
        <span className="session-item-date">{makeWeekDayString(LANG, start_time)}, {makeDateString(LANG, start_time)}</span>
        <div className="session-item-time">
          {!editing &&
            <>
            <div>
              <span>{makeTimeString(start_time)} to {makeTimeString(end_time)}</span>
              <span className="text-muted"> ({duration})</span>
            </div>
            <span className="session-item-hint">Click to modify</span>
            </>
          }
          {editing &&
            <form className="session-item__form">
              <label className="visually-hidden" for="start_time">Starting time</label>
              <input id="start_time" type="time" onChange={handleChange} value={formTimes.start_time} />
              <span> to </span>
              <label className="visually-hidden" for="end_time">Ending time</label>
              <input id="end_time" type="time" onChange={handleChange} value={formTimes.end_time} />
            </form>
          }
        </div>
    </ListGroupItem>
  )
}