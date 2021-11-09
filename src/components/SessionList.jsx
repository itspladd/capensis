import '../styles/SessionList.css'

import ListGroup from 'react-bootstrap/ListGroup'

import SessionItem from './SessionItem'

export default function SessionList(props) {
  const { sessions, refreshData } = props;

  const scrollToItem = element => {
    const myHeight = element.current.offsetParent.offsetTop;
    let container = element.current.parentElement;
    while (!container.className.includes("session-list")) {
      container = container.parentElement;
    }

    container.scrollTo(0, myHeight)
  }

  const sessionList = sessions.map(session => {
    return (
      <SessionItem
        {...session}
        key = {session.id}
        refreshData = {refreshData}
        scrollToMe = {scrollToItem}
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