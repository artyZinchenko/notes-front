import React from 'react'
import Note from './Note'
import { useSelector } from 'react-redux'
import List from '@mui/material/List'
import Paper from '@mui/material/Paper'
import styled from 'styled-components'
import { Typography } from '@mui/material'

const StyledList = styled(Paper)`
  color: ${({ theme }) => theme.palette.text.primary};
  background-color: ${({ theme }) => theme.palette.boxes.lightBox};
  margin-bottom: 20px;
`

const NoteList = () => {
  const notesToShow = useSelector((state) => {
    if (state.filter === 'ALL') return state.notes
    return state.filter === 'IMPORTANT'
      ? state.notes.filter((el) => el.important)
      : state.notes.filter((el) => !el.important)
  })
  const currentFilter = useSelector((state) => state.filter)

  return (
    <div>
      <StyledList elevation={3}>
        {notesToShow.length > 0 && (
          <List>
            {notesToShow.map((note) => (
              <Note key={note.id} note={note} />
            ))}
          </List>
        )}
        {notesToShow.length === 0 && currentFilter !== 'IMPORTANT' && (
          <Typography variant='subtitle1' sx={{ padding: '40px' }}>
            {' '}
            Your notes will display here...{' '}
          </Typography>
        )}
        {notesToShow.length === 0 && currentFilter === 'IMPORTANT' && (
          <Typography variant='subtitle1' sx={{ padding: '40px' }}>
            {' '}
            None of your notes are tagged as important...{' '}
          </Typography>
        )}
      </StyledList>
    </div>
  )
}

export default NoteList
