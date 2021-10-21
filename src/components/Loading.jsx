import '../styles/Loading.css'

import Spinner from 'react-bootstrap/Spinner'

export default function Loading() {
  return (
    <div className="loading">
      <Spinner animation="border" variant="primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      <p>Loading...</p>
    </div>
  )
}