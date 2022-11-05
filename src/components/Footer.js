import React from 'react'
import styled from 'styled-components'
import Paper from '@mui/material/Paper'
import Link from '@mui/material/Link'

const StyledFooter = styled(Paper)`
  background-color: ${({ theme }) => theme.palette.background.header};
  color: ${({ theme }) => theme.palette.text.primary};
  padding: 20px;
`

const Footer = () => {
  return (
    <StyledFooter square>
      <em>A training project made for storing notes</em>
      <p>
        <Link
          color='inherit'
          target='_blank'
          href='https://github.com/artyZinchenko/notes-front.git'
        >
          My Github account
        </Link>
      </p>
    </StyledFooter>
  )
}

export default Footer
