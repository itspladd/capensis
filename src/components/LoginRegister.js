import {useState} from 'react'

export default function LoginRegister() {

  const [formValues, setFormValues] = useState({
    loginUsername: "",
    loginPass: "",
    registerUsername: "",
    registerPass: ""
  })

  const handleLogin = event => {
    event.preventDefault();
    const {loginUsername, loginPass} = formValues;
    console.log(loginUsername, loginPass);
  }

  const handleRegister = event => {
    event.preventDefault();
    const {registerUsername, registerPass} = formValues;
    console.log(registerUsername, registerPass);
  }

  const handleChange = event => {
    event.preventDefault();
    setFormValues(prev => {
      const newVals = {...prev};
      newVals[event.target.name] = event.target.value;
      return newVals;
    })

  }

  return (
    <div className="login-register">
      <div class="login">
        <form onSubmit={handleLogin}>
          <label for="loginUsername">Username: </label>
          <input name="loginUsername" type="text" value={formValues.loginUsername} onChange={handleChange}></input>
          <label for="loginPass">Password: </label>

          <input name="loginPass" type="password" value={formValues.loginPass} onChange={handleChange}></input>
          <button>Login</button>
        </form>
      </div>
      <div class="register">
        <form onSubmit={handleRegister}>
          <label for="registerUsername">Username: </label>
          <input name="registerUsername" type="text" value={formValues.registerUsername} onChange={handleChange}></input>
          <label for="registerPass">Password: </label>
          <input name="registerPass" type="password" value={formValues.registerPass} onChange={handleChange}></input>
          <button>Register</button>
        </form>
      </div>
    </div>
  )
}