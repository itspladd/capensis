import {useState} from 'react'

export default function LoginRegister() {

  const [forms, setForms] = useState()

  const handleSubmit = event => {
    event.preventDefault();
    console.log(event)
  }

  return (
    <div className="login-register">
      <form onSubmit={handleSubmit}>
        <button>Submit</button>
      </form>
    </div>
  )
}