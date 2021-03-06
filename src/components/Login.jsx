import useControlledForms from '../hooks/useControlledForms';

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { useContext } from 'react';
import { ReducerActions } from '../reducer/context'

export default function Login() {

  const { login } = useContext(ReducerActions).auth

  const [formValues, handleFormChange] = useControlledForms({
    formLoginUsername: "",
    formLoginPassword: ""
  });

  const handleSubmit = event => {
    event.preventDefault();
    const { formLoginUsername, formLoginPassword } = formValues;
    login(formLoginUsername, formLoginPassword)
  }

  return (
    <Form className="loginForm" >
      <h4>Login</h4>
      <Form.Group className="mb-3" controlId="formLoginUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control onChange={handleFormChange} type="text" placeholder="Username" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formLoginPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control onChange={handleFormChange} type="password" placeholder="Password" />
      </Form.Group>
      <Button variant="success" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  )
}