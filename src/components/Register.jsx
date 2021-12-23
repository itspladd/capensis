import useControlledForms from '../hooks/useControlledForms';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { ReducerActions } from '../reducer/context'
import { useContext } from 'react';

export default function Register() {

  const { register } = useContext(ReducerActions).auth

  const [formValues, handleFormChange] = useControlledForms({
    formRegisterUsername: "",
    formRegisterPassword: ""
  });

  const handleSubmit = event => {
    event.preventDefault();
    const { formRegisterUsername, formRegisterPassword } = formValues;
    register(formRegisterUsername, formRegisterPassword)
  }

  return (
    <Form className="registerForm">
      <h4>Register</h4>
      <Form.Group className="mb-3" controlId="formRegisterUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control onChange={handleFormChange} type="text" placeholder="Username" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formRegisterPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control onChange={handleFormChange} type="password" placeholder="Password" />
      </Form.Group>
      <Button variant="success" type="submit" onClick={handleSubmit}>
        Create account
      </Button>
    </Form>
  )
}