import React, { useContext } from 'react'
import notesServices from '../services/notes'
import { useDispatch } from 'react-redux'
import { addNoteToStore } from '../reducers/notesReducer'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import { StyledButtonSecondary } from './styles/Buttons.styled'
import StyledTextField from './styles/TextField.styled'
import { setFilter } from '../reducers/filterReducer'
import NotificationContext from '../context/NotificationContext'

const NoteForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { setNotification } = useContext(NotificationContext)

  const setNote = async (event) => {
    try {
      event.preventDefault()
      const noteContent = event.target.note.value
      event.target.note.value = ''
      const newNote = { content: noteContent, important: false }
      const response = await notesServices.create(newNote)

      dispatch(addNoteToStore(response))
      dispatch(setFilter('ALL'))
      navigate('/notes')
    } catch (exception) {
      setNotification({ text: exception, type: 'error' })
      setTimeout(() => setNotification(null), 5000)
    }
  }

  return (
    <Box className='formDiv' sx={{ marginTop: '20px' }}>
      <form onSubmit={setNote}>
        <StyledTextField
          fullWidth
          label='Create a new note...'
          id='fullWidth'
          name='note'
          multiline
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <StyledButtonSecondary type='submit'>save</StyledButtonSecondary>
          <StyledButtonSecondary
            onClick={() => {
              navigate('/notes')
              dispatch(setFilter('ALL'))
            }}
          >
            back to all notes
          </StyledButtonSecondary>
        </Box>
      </form>
    </Box>
  )
}

export default NoteForm
