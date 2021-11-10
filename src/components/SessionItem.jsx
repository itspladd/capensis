import { useEffect, useState, useRef } from 'react'
import axios from 'axios'

// Helpers
import { delayAction } from '../helpers/timingHelpers'
import { makeHHMMTimeString, } from '../helpers/stringHelpers'

// Hooks
import useControlledForms from '../hooks/useControlledForms'

// Components
import PureSessionItem from './PureSessionItem'

// Constants
import STATUSES from '../constants/statuses'

const LANG = 'EN-US'

export default function SessionItem(props) {
  const { id, start_time, end_time, refreshData } = props;

  const [status, setStatus] = useState(STATUSES.STABLE);
  const [times, changeTimes] = useControlledForms({
    start: makeHHMMTimeString(start_time),
    end: makeHHMMTimeString(end_time)
  })
  const scrollTarget = useRef(null)

  const handleSubmit = (event, id) => {
    event.preventDefault();
    // Validate the times
    const [startH, startM] = times.start.split(":");
    const [endH, endM] = times.end.split(":");
    const start = new Date(start_time);
    const end = new Date(start_time);
    start.setHours(startH, startM);
    end.setHours(endH, endM);
    if (start < end) {
      // Update the submitting state
      setStatus(() => STATUSES.SUBMITTING)
      axios.patch(`/api/sessions/${id}`, {start_time: start.toISOString(), end_time: end.toISOString()})
        .then(() => delayAction(refreshData)) // Give the submitting animation time to run
        .then(() => scrollTarget.current.scrollIntoView(false))
        .then(() => setStatus(STATUSES.SUCCESS))
        .catch(() => setStatus(STATUSES.ERROR))
    }
  }

  const handleDelete = (event, id) => {
    event.preventDefault();
    axios.delete(`/api/sessions/${id}`)
      .then(() => setStatus(STATUSES.DELETING))
      .then(() => delayAction(refreshData)) // Gives the delete animation time to run
      .catch(() => setStatus(STATUSES.ERROR))
  }

  useEffect(() => {
    console.log(status)
    status === STATUSES.SUCCESS &&
    setTimeout(() => setStatus(STATUSES.STABLE), 3500)
  }, [status])

  return (
    <PureSessionItem
      status={status}
      refDay={start_time}
      start={times.start}
      end={times.end}
      changeTimes={changeTimes}
      submit={(e) => handleSubmit(e, id)}
      deleteItem={(e) => handleDelete(e, id)}
      setStatus={setStatus}
      id={id}
      ref={scrollTarget}
    >
    </PureSessionItem>
  )
}