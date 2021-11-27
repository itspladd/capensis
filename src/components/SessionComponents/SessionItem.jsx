import { useEffect, useState, useRef } from 'react'
import axios from 'axios'

// Helpers
import { delayAction } from '../../helpers/timingHelpers'
import { makeHHMMTimeString, } from '../../helpers/stringHelpers'

// Hooks
import useControlledForms from '../../hooks/useControlledForms'

// Components
import PureSessionItem from './PureSessionItem'

// Constants
import STATUSES from '../../constants/statuses'

export default function SessionItem(props) {
  const {
    id,
    start_time,
    end_time,
    refreshData,
    checkListDelete,
    title = "",
    toggle
  } = props;

  const [status, setStatus] = useState(STATUSES.NEW);
  const [times, handleTimeChange, setTimes] = useControlledForms({
    start: makeHHMMTimeString(start_time),
    end: makeHHMMTimeString(end_time)
  })
  const sessionItemRef = useRef(null)

  const active = start_time && !end_time;
  const project = !start_time && !end_time;

  // If this is an "active" session, set the status to "active" after the load animation.
  // Otherwise, set it to stable.
  useEffect(() => {
    active ?
      setTimeout(() => setStatus(STATUSES.ACTIVE), 500)
      :
      setTimeout(() => setStatus(STATUSES.STABLE), 500)
  }, [])

  // When the incoming times change, update the state.
  // This usually happens if refreshData fires outside the context of these
  // components.
  useEffect(() => {
    setTimes({
      start: makeHHMMTimeString(start_time),
      end: makeHHMMTimeString(end_time)
    })
    end_time && status !== STATUSES.SUCCESS && setStatus(STATUSES.STABLE)
  }, [setTimes, start_time, end_time])

  useEffect(() => {
    document.activeElement.blur();
    status === STATUSES.EDITING && sessionItemRef.current.focusTime();
  }, [status])

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
      setStatus(() => STATUSES.LOADING)
      axios.patch(`/api/sessions/${id}`, {start_time: start.toISOString(), end_time: end.toISOString()})
        .then(() => delayAction(refreshData)) // Give the submitting animation time to run
        .then(() => sessionItemRef.current.scroll())
        .then(() => setStatus(STATUSES.SUCCESS))
        .then(() => delayAction(() => setStatus(STATUSES.STABLE), 2500))
        .catch(() => setStatus(STATUSES.ERROR))
    }
  }

  const handleDelete = (event, id) => {
    event.preventDefault();
    axios.delete(`/api/sessions/${id}`)
      .then(() => {
        setStatus(STATUSES.DELETING)
        checkListDelete()
      })
      .then(() => delayAction(refreshData)) // Gives the delete animation time to run
      .catch(() => setStatus(STATUSES.ERROR))
  }

  const handleToggle = event => {
    event.preventDefault();
    if (project) {
      toggle(id)
      setStatus(STATUSES.DELETING)
    }
    if (active) {
      toggle()
      setStatus(STATUSES.STABLE)
    }
  }

  return (
    <PureSessionItem
      status={status}
      title={title}
      active={active}
      project={project}
      refDay={start_time}
      start={times.start}
      end={times.end}
      onChange={handleTimeChange}
      submit={(e) => handleSubmit(e, id)}
      deleteItem={(e) => handleDelete(e, id)}
      handleToggle={handleToggle}
      setStatus={setStatus}
      ref={sessionItemRef}
    >
    </PureSessionItem>
  )
}