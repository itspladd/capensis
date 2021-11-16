import {useState} from 'react'

import '../../styles/SessionList.css'
import classNames from 'classnames'

import ListGroup from 'react-bootstrap/ListGroup'

import SessionItem from './SessionItem'
import STATUSES from '../../constants/statuses'

export default function SessionList(props) {
  const { title, sessions, refreshData, toggleSession } = props;

  const [status, setStatus] = useState();

  // Allows SessionItems to delete this list if they're the last one to delete
  const checkDelete = () => {
    if (sessions.length === 1) setStatus(STATUSES.DELETING);
  }

  const sessionList = sessions.map(session => {
    return (
      <SessionItem
        {...session}
        key = {session.id}
        toggle = {toggleSession}
        refreshData = {refreshData}
        checkListDelete = {checkDelete}
      />
    )
  })

  const className = classNames("session-item", "header", {
    [status]: true
  })

  return (
    <ListGroup className="session-list">
      <ListGroup.Item className={className}>
      { title }
      </ListGroup.Item>
      { sessionList }
    </ListGroup>
  )
}