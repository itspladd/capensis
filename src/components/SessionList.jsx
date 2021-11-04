import { useState, useRef } from 'react'

import '../styles/SessionList.css'

import ListGroup from 'react-bootstrap/ListGroup'
import Overlay from 'react-bootstrap/Overlay'
import Tooltip from 'react-bootstrap/Tooltip'

import SessionItem from './SessionItem'

export default function SessionList(props) {
  const { sessions } = props;

  const target = useRef(null)

  const sessionList = sessions.map(session => {
    return (
        <SessionItem
          {...session}
          ref = {target}
          onHover={() => console.log('beans')}
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