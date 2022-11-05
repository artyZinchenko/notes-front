import React from 'react'
import { Typography } from '@mui/material'
import { StyledButtonMainReverse } from './styles/Buttons.styled'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import styled from 'styled-components'

const StyledTypography = styled(Typography)({
  color: ({ theme }) => theme.palette.text.primary,
})

const BoxFlexed = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '30px',
  justifyContent: 'flex-start',
  alignItems: 'center',
})

const HomePage = ({ user }) => {
  const navigate = useNavigate()
  return (
    <Box
      sx={{
        padding: '40px',
        textAlign: 'center',
        height: '100%',
      }}
    >
      {user ? (
        <BoxFlexed>
          <StyledTypography variant='h4'>
            Welcome back, {user.username}!{' '}
          </StyledTypography>
          <StyledButtonMainReverse
            onClick={() => {
              navigate('/notes')
            }}
          >
            Notes list
          </StyledButtonMainReverse>
        </BoxFlexed>
      ) : (
        <BoxFlexed>
          <StyledTypography variant='h4'>Welcome to NotesApp</StyledTypography>
          <Box sx={{ display: 'flex', gap: '17px' }}>
            <StyledButtonMainReverse
              onClick={() => {
                navigate('/signup')
              }}
            >
              Sign up
            </StyledButtonMainReverse>
            <StyledButtonMainReverse
              onClick={() => {
                navigate('/login')
              }}
            >
              Log in
            </StyledButtonMainReverse>
          </Box>
        </BoxFlexed>
      )}
    </Box>
  )
}

export default HomePage
