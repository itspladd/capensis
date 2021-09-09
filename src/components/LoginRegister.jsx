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
      <div className="login m-2">
        <form className="row row-cols-sm-auto g-3 align-items-center"
          onSubmit={handleLogin}>
          <div className="col-12">
            <label className="form-label" htmlFor="loginUsername">Username: </label>
          </div>
          <div className="col-12">
            <input className="form-control" name="loginUsername" type="text" value={formValues.loginUsername} onChange={handleFormChange}></input>
          </div>
          <div className="col-12">
            <label className="form-label" htmlFor="loginPass">Password: </label>
          </div>
          <div className="col-12">
            <input className="form-control" name="loginPass" type="password" value={formValues.loginPass} onChange={handleFormChange}></input>
          </div>
          <div className="col-12">
            <button class="btn btn-success">Login</button>
          </div>
        </form>
      </div>
      <div className="register m-2">
        <form className="row row-cols-sm-auto g-3 align-items-center"
          onSubmit={handleRegister}>
          <div className="col-12">
            <label className="form-label" htmlFor="registerUsername">Username: </label>
          </div>
          <div className="col-12">
            <input className="form-control" name="registerUsername" type="text" value={formValues.registerUsername} onChange={handleFormChange}></input>
          </div>
          <div className="col-12">
            <label className="form-label" htmlFor="registerPass">Password: </label>
          </div>
          <div className="col-12">
            <input className="form-control" name="registerPass" type="password" value={formValues.registerPass} onChange={handleFormChange}></input>
          </div>
          <div className="col-12">
            <button className="btn btn-success">Register</button>
          </div>
        </form>
      </div>
    </div>
  )
}