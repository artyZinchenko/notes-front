import React from 'react'
import { StyledHeader } from './styles/Header.styled'
import { Container } from './styles/Container.styled'

const Header = () => {
  return (
    <StyledHeader>
      <Container>
        {/* <Nav>
          <Logo src='./images/logo/svg' alt='' />
          <Button>Log in</Button>
        </Nav> */}
        <h1>Notes</h1>
      </Container>
    </StyledHeader>
  )
}

export default Header
