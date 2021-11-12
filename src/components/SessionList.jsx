import '../styles/SessionList.css'

import ListGroup from 'react-bootstrap/ListGroup'

import SessionItem from './SessionItem'
import STATUSES from '../constants/statuses'

export default function SessionList(props) {
  const { title, sessions, refreshData } = props;

  const sessionList = sessions.map(session => {
    const initialStatus =
      !session.start_time ? STATUSES.PROJECT :
      !session.end_time ? STATUSES.ACTIVE :
      STATUSES.STABLE
    return (
      <SessionItem
        {...session}
        key = {session.id}
        refreshData = {refreshData}
        initialStatus = {initialStatus}
      />
    )
  })

  return (
    <ListGroup className='session-list'>
      <ListGroup.Item className="session-item header">
      { title }
      </ListGroup.Item>
      { sessionList }
    </ListGroup>
  )
}