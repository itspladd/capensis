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

  const sessionList = sessions.map(session => {
    return (
        <SessionItem
          {...session}
          editing = {session.id === selected}
          edit = {() => select(session)}
          handleChange = {handleTimesChange}
          formTimes = {times}
          key = {session.id}
        />
    )
  })

  return (
    <ListGroup className='session-list'>
      <ListGroup.Item className="session-item header">
        <strong className="session-item-title">Project</strong>
        <strong className="session-item-date">Date</strong>
        <strong className="session-item-time">Time (click to edit)</strong>
      </ListGroup.Item>
      {sessionList}
    </ListGroup>
  )
}