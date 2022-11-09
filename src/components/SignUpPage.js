import React from 'react'
import { useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { StyledButtonMainReverse } from './styles/Buttons.styled'
import StyledTextField from './styles/TextField.styled'

import { useTheme } from 'styled-components'

const SignUp = ({ handleSignup, handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const theme = useTheme()
  const afterSignup = true

  const signupUser = async (event) => {
    event.preventDefault()
    const credentials = { username, password }

    try {
      await handleSignup(credentials)
      await handleLogin(credentials, afterSignup)
    } catch (exception) {
      return
    }
  }

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          paddingTop: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: theme.palette.boxes.darkBox }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign up to the NotesApp
        </Typography>
        <Box component='form' noValidate onSubmit={signupUser} sx={{ mt: 1 }}>
          <StyledTextField
            margin='normal'
            fullWidth
            id='username'
            label='Username'
            name='username'
            autoComplete='username'
            autoFocus
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />

          <StyledTextField
            margin='normal'
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />

          <StyledButtonMainReverse
            type='submit'
            fullWidth
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </StyledButtonMainReverse>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Link href='/login' variant='body2'>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default SignUp
