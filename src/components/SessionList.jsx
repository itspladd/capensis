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

      </ListGroup.Item>
      {sessionList}
    </ListGroup>
  )
}