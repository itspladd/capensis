import '../styles/Loading.css'

import Spinner from 'react-bootstrap/Spinner'

export default function Loading(props) {
  return (
    <div className="loading">
      <Spinner animation="border" variant="primary" role="status">
        <span className="visually-hidden">{props.children}</span>
      </Spinner>
      <p>{props.children}</p>
    </div>
  )
}