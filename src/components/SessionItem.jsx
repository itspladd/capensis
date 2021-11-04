import { makeTimeString, makeWeekDayString, makeDateString } from '../helpers/stringHelpers'
import { getTimeIntervalUnits } from '../helpers/timeHelpers'


import '../styles/SessionItem.css'

import ListGroupItem from 'react-bootstrap/ListGroupItem'

import useControlledForms from '../hooks/useControlledForms'

const LANG = 'EN-US'

export default function SessionItem(props) {
  const { id, project_id, title, start_time, end_time } = props;

  const [h, m, s] = getTimeIntervalUnits(start_time, end_time)

  const hours = h ? `${h}h ` : '';
  const mins = `${m}m `
  const secs = `${s}s`

  return(
    <ListGroupItem className="session-item" action>
        <strong className="session-item-title">{title}</strong>
        <span className="session-item-date">{makeWeekDayString(LANG, start_time)}, {makeDateString(LANG, start_time)}</span>
        <p className="session-item-time">
          <span>{makeTimeString(start_time)} to {makeTimeString(end_time)}</span>
          <span className="text-muted"> ({hours}{mins}{secs})</span>
        </p>
    </ListGroupItem>
  )
}