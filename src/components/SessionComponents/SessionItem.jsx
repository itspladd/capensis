import { useEffect, useState, useRef, useContext } from 'react'

// Helpers
import { delayAction } from '../../helpers/timingHelpers'
import { makeHHMMTimeString, } from '../../helpers/stringHelpers'

// Hooks
import useControlledForms from '../../hooks/useControlledForms'

// Components
import PureSessionItem from './PureSessionItem'

// Constants
import STATUSES from '../../constants/statuses'

// Context
import { ReducerState, ReducerActions } from '../../reducer/context'

export default function SessionItem(props) {
  const {
    id,
    start_time,
    end_time,
    checkListDelete,
    title = "",
  } = props;

  const state = useContext(ReducerState)
  const actions = useContext(ReducerActions)

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
    const statusTimer = active ?
      setTimeout(() => setStatus(STATUSES.ACTIVE), 500)
      :
      setTimeout(() => setStatus(STATUSES.STABLE), 500)
    return function cleanup() {
      clearTimeout(statusTimer)
    }
  }, [active])

  // When the incoming times change, update the state.
  // This usually happens if refreshData fires outside the context of these
  // components.
  useEffect(() => {
    setTimes({
      start: makeHHMMTimeString(start_time),
      end: makeHHMMTimeString(end_time)
    })
    end_time && status !== STATUSES.SUCCESS && setStatus(STATUSES.STABLE)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start_time, end_time])

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
      actions.data.editSession(id, start.toISOString(), end.toISOString()) // Give the submitting animation time to run
        .then(() => sessionItemRef.current.scroll())
        .then(() => setStatus(STATUSES.SUCCESS))
        .then(() => delayAction(() => setStatus(STATUSES.STABLE), 2500))
        .catch(() => setStatus(STATUSES.ERROR))
    }
  }

  const handleDelete = (event, id) => {
    event.preventDefault();
    setStatus(STATUSES.DELETING)
    checkListDelete()
    delayAction(() => actions.data.deleteSession(id)) // Gives the delete animation time to run
      .catch(() => setStatus(STATUSES.ERROR))
  }

  const handleToggle = event => {
    event.preventDefault();
    if (project) {
      actions.data.toggleSession(id)
      setStatus(STATUSES.DELETING)
    }
    if (active) {
      actions.data.toggleSession(state.trackedSession.project_id)
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