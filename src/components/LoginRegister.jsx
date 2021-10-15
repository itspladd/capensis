import useControlledForms from '../hooks/useControlledForms';
import Login from "./Login"
import Register from "./Register"

export default function LoginRegister(props) {

  const { setUsername } = props;

  return (
    <div className="login-register">
      <Login setUsername={setUsername} />
      <Register setUsername={setUsername} />
    </div>
  )
}