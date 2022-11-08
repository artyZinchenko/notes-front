import React from 'react'
import styled from 'styled-components'
import Paper from '@mui/material/Paper'
import Link from '@mui/material/Link'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import Box from '@mui/system/Box'
import Typography from '@mui/material/Typography'

const StyledFooter = styled(Paper)`
  background-color: ${({ theme }) => theme.palette.background.header};
  color: ${({ theme }) => theme.palette.text.primary};
  padding: 20px;
`

const Footer = () => {
  return (
    <StyledFooter square>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <Typography variant='body2' align='center'>
            {'Copyright © '} NotesApp {new Date().getFullYear()}
            {'.'}
          </Typography>
          <Link
            target='_blank'
            href='https://github.com/artyZinchenko/notes-front.git'
            color='inherit'
          >
            <Typography variant='body2' align='center'>
              repo
            </Typography>
          </Link>
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: '10px',
            alignItems: 'center',
          }}
        >
          <Link
            color='inherit'
            target='_blank'
            href='https://github.com/artyZinchenko'
          >
            <GitHubIcon fontSize='medium' />
          </Link>
          <Link
            color='inherit'
            target='_blank'
            href='https://www.linkedin.com/in/artem-zinchenko-976793251
'
          >
            <LinkedInIcon fontSize='medium' />
          </Link>
        </Box>
      </Box>
    </StyledFooter>
  )
}

export default Footer
