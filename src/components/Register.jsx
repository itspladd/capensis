import axios from 'axios';
import useControlledForms from '../hooks/useControlledForms';

export default function Register(props) {

  const { setUsername } = props;

  const [formValues, handleFormChange] = useControlledForms({
    username: "",
    rawPassword: ""
  });

  const handleSubmit = event => {
    event.preventDefault();
    const { username, rawPassword } = formValues;
    axios.post(`/api/users`, {username, rawPassword})
         .then(res => setUsername(res.data.username))
  }

  return (
    <div className="register m-2">
      <form className="row row-cols-sm-auto g-3 align-items-center"
        onSubmit={handleSubmit}>
        <div className="col-12">
          <label className="form-label" htmlFor="username">Username: </label>
        </div>
        <div className="col-12">
          <input
            className="form-control" name="username" type="text" value={formValues.username} onChange={handleFormChange}></input>
        </div>
        <div className="col-12">
          <label className="form-label" htmlFor="rawPassword">Password: </label>
        </div>
        <div className="col-12">
          <input className="form-control" name="rawPassword" type="password" value={formValues.rawPassword} onChange={handleFormChange}></input>
        </div>
        <div className="col-12">
          <button className="btn btn-success">Register</button>
        </div>
      </form>
    </div>
  )
}