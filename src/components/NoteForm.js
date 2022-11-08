import React, { useContext, useState } from 'react'
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
  const [showDescription, setShowDescription] = useState(false)
  const [isSetting, setIsSetting] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { setNotification } = useContext(NotificationContext)
  const [noteText, setNoteText] = useState('')
  const [descriptionText, setDescriptionText] = useState('')

  const setNote = async (event) => {
    event.preventDefault()
    setIsSetting(true)
    try {
      const newNote = { content: noteText, important: false }

      if (descriptionText.length > 0) newNote.description = descriptionText

      const response = await notesServices.create(newNote)

      dispatch(addNoteToStore(response))
      dispatch(setFilter('ALL'))
      navigate('/notes')
    } catch (exception) {
      setNotification({ text: exception, type: 'error' })
      setTimeout(() => setNotification(null), 5000)
    }
    setIsSetting(false)
  }

  return (
    <Box className='formDiv' sx={{ marginTop: '20px' }}>
      <form onSubmit={setNote}>
        <StyledTextField
          fullWidth
          label='Create a new note...'
          id='fullWidth'
          name='note'
          value={noteText}
          onChange={(e) => {
            setNoteText(e.target.value)
          }}
          multiline
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <StyledButtonSecondary type='submit' disabled={isSetting}>
            save
          </StyledButtonSecondary>
          <StyledButtonSecondary
            onClick={() => setShowDescription(!showDescription)}
          >
            {showDescription ? 'hide description' : 'add description'}
          </StyledButtonSecondary>
          <StyledButtonSecondary
            onClick={() => {
              navigate('/notes')
              dispatch(setFilter('ALL'))
            }}
          >
            back to all notes
          </StyledButtonSecondary>
        </Box>
        {showDescription && (
          <StyledTextField
            fullWidth
            id='filled-multiline-static'
            multiline
            rows={4}
            variant='filled'
            label='Optional note description...'
            name='description'
            value={descriptionText}
            onChange={(e) => setDescriptionText(e.target.value)}
          />
        )}
      </form>
    </Box>
  )
}

export default NoteForm
