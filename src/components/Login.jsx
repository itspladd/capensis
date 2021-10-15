import axios from 'axios';
import useControlledForms from '../hooks/useControlledForms';

export default function LoginRegister(props) {

  const { setUsername } = props;

  const [formValues, handleFormChange] = useControlledForms({
    username: "",
    rawPassword: ""
  });

  const handleLogin = event => {
    event.preventDefault();
    const { username, rawPassword } = formValues;
    axios.post(`/api/login`, {username, rawPassword})
         .then(res => setUsername(res.data.username))
  }


  return (
      <div className="login m-2">
        <form className="row row-cols-sm-auto g-3 align-items-center"
          onSubmit={handleLogin}>
          <div className="col-12">
            <label className="form-label" htmlFor="username">Username: </label>
          </div>
          <div className="col-12">
            <input className="form-control" name="username" type="text" value={formValues.username} onChange={handleFormChange}></input>
          </div>
          <div className="col-12">
            <label className="form-label" htmlFor="rawPassword">Password: </label>
          </div>
          <div className="col-12">
            <input className="form-control" name="rawPassword" type="password" value={formValues.rawPassword} onChange={handleFormChange}></input>
          </div>
          <div className="col-12">
            <button className="btn btn-success">Login</button>
          </div>
        </form>
      </div>
  )
}