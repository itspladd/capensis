import { useState } from 'react'

import Login from './Login'
import Register from './Register'

import '../styles/NoAuthUser.css';

export default function NoAuthUser(props) {
  const {login} = props

  const [show, setShow] = useState("login")

  return (
    <div className="NoAuthUser">
      <div id="NoAuth_welcome">
        <h1 className="appName">Capensis</h1>
      </div>
      { show === "login" && <Login login={login} /> }
      { show === "register" && <Register login={login} />}
    </div>
  )
}