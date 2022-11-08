import React from 'react'
import { useState } from 'react'

import Avatar from '@mui/material/Avatar'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { useNavigate } from 'react-router-dom'
import { useTheme } from 'styled-components'
import { StyledButtonMainReverse } from './styles/Buttons.styled'
import StyledTextField from './styles/TextField.styled'
import Grid from '@mui/material/Grid'

const LoginPage = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const theme = useTheme()

  const loginUser = async (event) => {
    event.preventDefault()
    const credentials = { username, password }
    await handleLogin(credentials)
    navigate('/notes')
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
          Log in to use NotesApp
        </Typography>
        <Box component='form' onSubmit={loginUser} noValidate sx={{ mt: 1 }}>
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
            Log in
          </StyledButtonMainReverse>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Link href='/signup' variant='body2'>
                Do not have an account? Sign up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default LoginPage
