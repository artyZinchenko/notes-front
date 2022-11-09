import React from 'react'
import styled from 'styled-components'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

import { Box } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import ModeSwitchButton from './ModeSwitchButton'
import { StyledButtonMainReverse } from './styles/Buttons.styled'
import HistoryEduOutlinedIcon from '@mui/icons-material/HistoryEduOutlined'
import useMediaQuery from '@mui/material/useMediaQuery'

const StyledHeader = styled(AppBar)({
  minHeight: '11vh',
  backgroundColor: ({ theme }) => theme.palette.background.header,
  color: ({ theme }) => theme.palette.text.primary,
  width: '100vw',
  padding: '20px 0',
  '& .css-i4bv87-MuiSvgIcon-root': {
    height: '1em',
    width: '1em',
  },
})

const NoteIcon = styled(HistoryEduOutlinedIcon)({
  color: ({ theme }) => theme.palette.niceColor.blue,
})

const StyledTypography = styled(Typography)({
  opacity: '0.6',
  whiteSpace: 'nowrap',
})

const Header = ({ user, setUser, setTheme, theme }) => {
  const navigate = useNavigate()
  const matches = useMediaQuery('(min-width:600px)')

  const handleLogOut = () => {
    if (confirm('Do you want to log out?')) {
      setUser(null)
      window.localStorage.removeItem('loggedNoteappUser')
      navigate('/')
    }
  }
  return (
    <StyledHeader position='static'>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignContent: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexWrap: 'nowrap',
          }}
        >
          <NoteIcon fontSize='large' />

          <Typography variant='h5' color='#3b82f6'>
            NotesApp
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            paddingTop: '4px',
            gap: '20px',
          }}
        >
          {user && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'baseline',
                paddingTop: '4px',
                gap: '20px',
              }}
            >
              {matches && (
                <StyledTypography
                  variant='subtitle1'
                  sx={{ overflowWrap: 'break-word', maxWidth: '50vw' }}
                >
                  {user.username} logged-in
                </StyledTypography>
              )}

              <StyledButtonMainReverse
                onClick={handleLogOut}
                sx={{ whiteSpace: 'nowrap' }}
              >
                log out
              </StyledButtonMainReverse>
            </Box>
          )}
          <ModeSwitchButton setTheme={setTheme} theme={theme} />
        </Box>
      </Toolbar>
    </StyledHeader>
  )
}

export default Header
