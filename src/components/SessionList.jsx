import { useState } from 'react'
import { makeHHMMTimeString } from '../helpers/stringHelpers'

import '../styles/SessionList.css'

import ListGroup from 'react-bootstrap/ListGroup'
import Overlay from 'react-bootstrap/Overlay'
import Tooltip from 'react-bootstrap/Tooltip'

import SessionItem from './SessionItem'
import useControlledForms from '../hooks/useControlledForms'

export default function SessionList(props) {
  const { sessions } = props;

  const [selected, setSelected] = useState(null)
  const [times, handleTimesChange, setTimes] = useControlledForms({ start_time: "", end_time: ""})
  const [submitStatus, setSubmitStatus] = useState({});
  const [successStatus, setSuccessStatus] = useState({});

  const select = session => {
    const { id, start_time, end_time } = session;
    if (selected !== id) {
      setSelected(id);
      setTimes({
        start_time: makeHHMMTimeString(start_time),
        end_time: makeHHMMTimeString(end_time)
      })
    }
  }

  const clearSubmission = id => {
    const newSubmits = { ...submitStatus };
    delete newSubmits[id];
    setSubmitStatus(newSubmits)
  }

  const clearSuccess = id => {
    const newSuccess = { ...successStatus };
    delete newSuccess[id];
    setSuccessStatus(newSuccess);
  }

  const onSubmit = (event, refDate, id) => {
    event.preventDefault();
    // Validate the times
    const { start_time, end_time } = times;
    const [startH, startM] = start_time.split(":");
    const [endH, endM] = end_time.split(":");
    const startDate = new Date(refDate).setHours(startH, startM);
    const endDate = new Date(refDate).setHours(endH, endM);
    if (startDate < endDate) {
      // Update the submitting state
      setSubmitStatus(prev => ({...prev, [id]: { start_time, end_time }}));
      setSelected(null)
      setTimeout(() => {
        clearSubmission(id);
        setSuccessStatus(prev => ({...prev, [id]: true}))
        setTimeout(() => clearSuccess(id), 3000);
      }, 2000)
    }
  }

  const sessionList = sessions.map(session => {

    const status = 

    return (
        <SessionItem
          {...session}
          editing = {session.id === selected}
          edit = {() => select(session)}
          handleChange = {handleTimesChange}
          handleSubmit = {(e) => onSubmit(e, new Date(session.start_time), session.id)}
          formTimes = {times}
          submitTimes = {submitStatus[session.id]}
          success = {successStatus[session.id]}
          key = {session.id}
        />
    )
  })

  return (
    <ListGroup className='session-list'>
      <ListGroup.Item className="session-item header">
        <div className="session-item-content">
          <strong className="session-item-title">Project</strong>
          <strong className="session-item-date">Date</strong>
          <strong className="session-item-time">Time (click to edit)</strong>
        </div>
        <div className="session-item-status"></div>
      </ListGroup.Item>
      {sessionList}
    </ListGroup>
  )
}