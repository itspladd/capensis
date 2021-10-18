import axios from 'axios';
import useControlledForms from '../hooks/useControlledForms';

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default function Login(props) {

  const { setUsername } = props;

  const [formValues, handleFormChange] = useControlledForms({
    username: "",
    rawPassword: ""
  });

  const handleSubmit = event => {
    event.preventDefault();
    const { username, rawPassword } = formValues;
    axios.post(`/api/login`, {username, rawPassword})
         .then(res => setUsername(res.data.username))
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control onChange={handleFormChange} type="text" placeholder="Username" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="rawPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control onChange={handleFormChange} type="password" placeholder="Password" />
      </Form.Group>
      <Button variant="success" type="submit" >
        Submit
      </Button>
    </Form>
  )

  /* Old implementation with basic forms
  * return (
      <div className="login m-2">
        <form className="row row-cols-sm-auto g-3 align-items-center"
          onSubmit={handleSubmit}>
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
  ) */
}