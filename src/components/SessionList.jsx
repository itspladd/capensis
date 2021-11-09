import '../styles/SessionList.css'

import ListGroup from 'react-bootstrap/ListGroup'

import SessionItem from './SessionItem'

export default function SessionList(props) {
  const { sessions, refreshData } = props;

  const sessionList = sessions.map(session => {
    return (
      <SessionItem
        {...session}
        key = {session.id}
        refreshData = {refreshData}
      />
    )
  })

  return (
    <ListGroup className='session-list'>
      <ListGroup.Item className="session-item header">
        <div className="session-item-content">
          <strong className="session-item-title">Project</strong>
          <strong className="session-item-date">Date</strong>
          <strong className="session-item-time">Time</strong>
        </div>
        <div className="session-item-status"></div>
      </ListGroup.Item>
      {sessionList}
    </ListGroup>
  )
}