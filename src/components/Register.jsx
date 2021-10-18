import axios from 'axios';
import useControlledForms from '../hooks/useControlledForms';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default function Register(props) {

  const { setUsername } = props;

  const [formValues, handleFormChange] = useControlledForms({
    formRegisterUsername: "",
    formRegisterPassword: ""
  });

  const handleSubmit = event => {
    event.preventDefault();
    const { formRegisterUsername, formRegisterPassword } = formValues;
    axios.post(`/api/users`, {username: formRegisterUsername, rawPassword: formRegisterPassword})
         .then(res => setUsername(res.data.username))
  }

  return (
    <Form className="registerForm" onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formRegisterUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control onChange={handleFormChange} type="text" placeholder="Username" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formRegisterPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control onChange={handleFormChange} type="password" placeholder="Password" />
      </Form.Group>
      <Button variant="success" type="submit" >
        Register
      </Button>
    </Form>
  )
}