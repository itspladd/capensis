import { useState } from 'react'
import axios from 'axios'
import { makeHHMMTimeString, } from '../helpers/stringHelpers'

import useControlledForms from '../hooks/useControlledForms'


import PureSessionItem from './PureSessionItem'

import STATUSES from '../constants/statuses'

const LANG = 'EN-US'

export default function SessionItem(props) {
  const { title, id, start_time, end_time, refreshData } = props;

  const [status, setStatus] = useState(STATUSES.STABLE);
  const [times, changeTimes] = useControlledForms({
    start: makeHHMMTimeString(start_time),
    end: makeHHMMTimeString(end_time)
  })

  const setSelfClearingSuccess = () => {
    setStatus(STATUSES.SUCCESS);
    setTimeout(() => setStatus(STATUSES.STABLE), 3000);
  }

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
      setStatus(STATUSES.SUBMITTING);
      axios.patch(`/api/sessions/${id}`, {start_time: start.toISOString(), end_time: end.toISOString()})
        .then(refreshData)
        .then(setSelfClearingSuccess)
        .catch(() => setStatus(STATUSES.ERROR))
    }
  }
  console.log(times)
  return (
    <PureSessionItem
      status={status}
      title={title}
      refDay={start_time}
      start={times.start}
      end={times.end}
      changeTimes={changeTimes}
      submit={(e) => handleSubmit(e, id)}
      setStatus={setStatus}
    >
    </PureSessionItem>
  )
}