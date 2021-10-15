import axios from 'axios';
import useControlledForms from '../hooks/useControlledForms';

export default function Register(props) {

  const { setUsername } = props;

  const [formValues, handleFormChange] = useControlledForms({
    registerUsername: "",
    registerPass: ""
  });

  const handleRegister = event => {
    event.preventDefault();
    const { registerUsername, registerPass } = formValues;
    axios.post(`/api/users`, {username: registerUsername, rawPassword: registerPass})
         .then(res => setUsername(res.data.username))
  }

  return (
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
  )
}