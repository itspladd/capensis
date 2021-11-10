import '../styles/SessionList.css'

import ListGroup from 'react-bootstrap/ListGroup'

import SessionItem from './SessionItem'

export default function SessionList(props) {
  const { title, sessions, refreshData } = props;

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
      {title}
      </ListGroup.Item>
      {sessionList.length ?
        sessionList :
        <ListGroup.Item className="session-item stable">
          No time tracked for this project!
        </ListGroup.Item>
      }
    </ListGroup>
  )
}