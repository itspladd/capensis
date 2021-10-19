import { useState } from 'react'
import Button from 'react-bootstrap/Button'

import Login from './Login'
import Register from './Register'

import '../styles/NoAuthUser.css';

export default function NoAuthUser(props) {
  const {login} = props

  const [showLogin, setShowLogin] = useState(true)

  const switchMsg = showLogin ? "Don't have an account yet?" : "Already have a Capensis account?";
  const buttonMsg = showLogin ? "Sign up" : "Sign in";

  const handleSwitch = event => {
    event.preventDefault();
    document.activeElement.blur(); // Clear focus from the button
    setShowLogin(!showLogin)
  }

  return (
    <div className="NoAuthUser">
      <div id="NoAuth_welcome">
        <p className="appName">Capensis</p>
        <p className="welcomeMessage">A super simple scheduler and time-tracker.</p>
      </div>

      { showLogin ? <Login login={login} /> : <Register login={login} /> }

      <div className="authSwitch">
        <p>{switchMsg}</p>
        <Button
          variant="info"
          size="sm"
          onClick={handleSwitch}
        >{buttonMsg}</Button>
      </div>
    </div>
  )
}