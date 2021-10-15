import axios from 'axios';
import useControlledForms from '../hooks/useControlledForms';

export default function LoginRegister(props) {

  const { setUsername } = props;

  const [formValues, handleFormChange] = useControlledForms({
    loginUsername: "",
    loginPass: ""
  });

  const handleLogin = event => {
    event.preventDefault();
    const { loginUsername, loginPass } = formValues;
    axios.post(`/api/login`, {username: loginUsername, rawPassword: loginPass})
         .then(res => setUsername(res.data.username))
  }


  return (
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
            <button className="btn btn-success">Login</button>
          </div>
        </form>
      </div>
  )
}