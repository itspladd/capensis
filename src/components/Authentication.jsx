import { useState } from 'react'
import Button from 'react-bootstrap/Button'

import Login from './Login'
import Register from './Register'
import Logo from './Logo';

import '../styles/Authentication.css';

export default function Authentication(props) {
  const {login} = props

  const [showLogin, setShowLogin] = useState(true)
  
  const authComponent = showLogin ? <Login login={login} /> : <Register login={login} />;
  const switchMsg = showLogin ? "Don't have an account yet?" : "Already have a Capensis account?";
  const buttonMsg = showLogin ? "Sign up" : "Sign in";

  const handleSwitch = event => {
    event.preventDefault();
    document.activeElement.blur(); // Clear focus from the button
    setShowLogin(!showLogin)
  }

  return (
    <div className="Authentication">
      <div id="Authentication_background">
        <div id="Authentication_welcome">
          <Logo className="auth-logo" hareOnly scale={2}
          />
          <p className="appName">Capensis</p>
          <p className="welcomeMessage">A super simple scheduler and time-tracker.</p>
        </div>

        { authComponent }

        <div className="Authentication_switch">
          <p>{switchMsg}</p>
          <Button
            variant="primary"
            size="sm"
            onClick={handleSwitch}
          >{buttonMsg}</Button>
        </div>
      </div>
    </div>
  )
}