import Login from './Login'
import Register from './Register'

export default function NoAuthUser(props) {
  const {login} = props
  return (
    <div className="NoAuthUser">
      <Login login={login} />
      <Register login={login} />
    </div>
  )
}