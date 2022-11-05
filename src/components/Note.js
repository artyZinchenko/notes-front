import React from 'react'
import { Link } from 'react-router-dom'
import ListItem from '@mui/material/ListItem'
import { Typography } from '@mui/material'
import styled from 'styled-components'

const StyledListItem = styled(ListItem)({
  '&:hover': {
    backgroundColor: ({ theme }) => theme.palette.background.default,
    color: ({ theme }) => theme.palette.text.reverse,
    borderRadius: '6px',
  },
})

const Note = ({ note }) => {
  return (
    <StyledListItem className='note'>
      <Link to={`/notes/${note.id}`}>
        <Typography variant='h6'>{note.content}</Typography>
      </Link>
    </StyledListItem>
  )
}

export default Note
