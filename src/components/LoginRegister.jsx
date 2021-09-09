import axios from 'axios';
import useControlledForms from '../hooks/useControlledForms';

export default function LoginRegister(props) {

  const { setUsername } = props;

  const [formValues, handleFormChange] = useControlledForms({
    loginUsername: "",
    loginPass: "",
    registerUsername: "",
    registerPass: ""
  });

  const handleLogin = event => {
    event.preventDefault();
    const { loginUsername, loginPass } = formValues;
    console.log(`Logging in with username: ${loginUsername} and password: ${loginPass}`);
    axios.post(`/api/login`, {username: loginUsername, rawPassword: loginPass})
         .then(res => setUsername(res.data.username))
  }

  const handleRegister = event => {
    event.preventDefault();
    const { registerUsername, registerPass } = formValues;
    console.log(`Registering a new user with username: ${registerUsername} and password: ${registerPass}`);
    axios.post(`/api/users`, {username: registerUsername, rawPassword: registerPass})
         .then(res => setUsername(res.data.username))
  }


  return (
    <div className="login-register">
      <div className="login">
        <form onSubmit={handleLogin}>
          <label htmlFor="loginUsername">Username: </label>
          <input name="loginUsername" type="text" value={formValues.loginUsername} onChange={handleFormChange}></input>

          <label htmlFor="loginPass">Password: </label>
          <input name="loginPass" type="password" value={formValues.loginPass} onChange={handleFormChange}></input>

          <button>Login</button>
        </form>
      </div>
      <div className="register">
        <form onSubmit={handleRegister}>
          <label htmlFor="registerUsername">Username: </label>
          <input name="registerUsername" type="text" value={formValues.registerUsername} onChange={handleFormChange}></input>

          <label htmlFor="registerPass">Password: </label>
          <input name="registerPass" type="password" value={formValues.registerPass} onChange={handleFormChange}></input>

          <button>Register</button>
        </form>
      </div>
    </div>
  )
}