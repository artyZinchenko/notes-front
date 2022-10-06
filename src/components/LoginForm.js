import React from 'react'
import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  LoginForm.propTypes = {
    handleLogin: PropTypes.func.isRequired,
  }

  const loginUser = (event) => {
    event.preventDefault()
    const credentials = { username, password }
    handleLogin(credentials)
    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={loginUser}>
      <div>
        username
        <input
          id='username'
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id='password'
          type='text'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit' id='login-button'>
        login
      </button>
    </form>
  )
}

export default LoginForm
