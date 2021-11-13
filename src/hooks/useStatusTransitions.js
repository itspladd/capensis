import { useState, useEffect } from 'react'
import STATUSES from '../constants/statuses'
import { delayAction } from '../helpers/timingHelpers';

export default function useStatusTransitions(statusAfterNew = STATUSES.STABLE) {
  const [initial] = useState(statusAfterNew);
  const [status, setStatus] = useState(STATUSES.NEW);

  const setDelayedStatus = (newStatus, delayMs) => {
    delayAction(() => setStatus(status), delayMs)
  }

  // When we change status, auto-transition after delay if there's a defined next status
  // Note that we ALWAYS change from NEW to the given initial status (STABLE by default)
  useEffect(() => {
    let nextStatus = false;
    if (status === STATUSES.NEW) nextStatus = initial;
    if (status === STATUSES.LOADING) nextStatus = initial;
    if (status === STATUSES.SUCCESS) nextStatus = STATUSES.STABLE;

    if (nextStatus) delayAction(() => setStatus(nextStatus))
  }, [status])


  return [status, setStatus, setDelayedStatus]
}