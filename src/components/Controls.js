import React from 'react'
import Filter from './Filter'
import Box from '@mui/system/Box'
import { Link } from 'react-router-dom'
import { StyledButtonSecondary } from './styles/Buttons.styled'

const Controls = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Filter />
      <>
        <Link to='/create'>
          <StyledButtonSecondary>New note</StyledButtonSecondary>
        </Link>
      </>
    </Box>
  )
}

export default Controls
