import React from 'react'
import { useState, useContext } from 'react'
import StyledTextField from './styles/TextField.styled'
import Box from '@mui/system/Box'

import { StyledButtonSecondary } from './styles/Buttons.styled'

import noteServices from '../services/notes'
import { useDispatch } from 'react-redux'
import { modifyNote } from '../reducers/notesReducer'
import NotificationContext from '../context/NotificationContext'

const DescriptionModification = ({ note }) => {
  const [text, setText] = useState(note.description)
  const dispatch = useDispatch()
  const { setNotification } = useContext(NotificationContext)

  const handleCancelChanges = () => {
    const initialDescription = note.description
    setText(initialDescription)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (text.split('').length < 1) {
      setNotification({
        text: 'Please add some text before saving description',
        type: 'warning',
      })
      setTimeout(() => setNotification(null), 5000)
      return
    }

    const changedNote = { ...note, description: text }

    try {
      const response = await noteServices.update(changedNote.id, changedNote)
      dispatch(modifyNote(response))
      setNotification({ text: 'Description saved', type: 'success' })
      setTimeout(() => setNotification(null), 2500)
    } catch (exception) {
      setNotification({ text: exception, type: 'error' })
      setTimeout(() => setNotification(null), 2500)
    }
  }

  const handleDelete = async () => {
    if (note.description === '') return
    const changedNote = { ...note, description: '' }
    setText('')
    try {
      const response = await noteServices.update(changedNote.id, changedNote)
      dispatch(modifyNote(response))
      setNotification({ text: 'Description deleted', type: 'success' })
      setTimeout(() => setNotification(null), 5000)
    } catch (exception) {
      setNotification({ text: exception, type: 'error' })
      setTimeout(() => setNotification(null), 5000)
    }
  }
  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <StyledTextField
          fullWidth
          id='filled-multiline-static'
          multiline
          minRows={4}
          variant='filled'
          placeholder='Optional note description...'
          name='description'
          value={text}
          onChange={(e) => {
            setText(e.target.value)
          }}
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '10px',
          }}
        >
          <StyledButtonSecondary
            onClick={(event) => handleCancelChanges(event)}
          >
            Cancel changes
          </StyledButtonSecondary>
          <StyledButtonSecondary onClick={handleDelete}>
            Delete description
          </StyledButtonSecondary>
          <StyledButtonSecondary type='submit'>
            Save changes
          </StyledButtonSecondary>
        </Box>
      </form>
    </Box>
  )
}

export default DescriptionModification
