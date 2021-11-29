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
  const buttonMsg = showLogin ? "Make one!" : "Sign in!";

  const handleSwitch = event => {
    event.preventDefault();
    document.activeElement.blur(); // Clear focus from the button
    setShowLogin(!showLogin)
  }

  return (
    <div className="authentication">
      <div id="authentication_welcome">
        <div className="appName">
          <Logo className="auth-logo" hareOnly scale={2}/>
          <p>Capensis</p>
        </div>
        <p className="welcomeMessage">A super simple scheduler and time-tracker.</p>
      </div>
      <section className="auth_body">
        { authComponent }

        <div className="authentication_switch">
          <p className="text-muted">{switchMsg}</p>
          <button onClick={handleSwitch}>{buttonMsg}</button>
        </div>
      </section>
    </div>
  )
}