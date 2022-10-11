import React from 'react'
import { StyledHeader } from './styles/Header.styled'
import { Container } from './styles/Container.styled'
import Togglable from './Togglable'
import LoginForm from './LoginForm'

const Header = ({ handleLogin, user }) => {
  console.log(user)
  return (
    <Container>
      <StyledHeader>
        <div>
          <h1>Notes</h1>
        </div>
        <div>
          {user ? (
            <p>{user.username} logged-in</p>
          ) : (
            <Togglable buttonLabel='login'>
              <LoginForm handleLogin={handleLogin} />
            </Togglable>
          )}
        </div>
      </StyledHeader>
    </Container>
  )
}

export default Header
