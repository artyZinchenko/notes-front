import React from 'react'
import { useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { modifyNote, deleteFromStore } from '../reducers/notesReducer'
import { setFilter } from '../reducers/filterReducer'
import notesServices from '../services/notes'
import { useState } from 'react'
import ModificationForm from './ModificationForm'
import {
  StyledButtonSecondary,
  StyledButtonMainReverse,
} from './styles/Buttons.styled'
import StyledPaper from './styles/Paper.styled'
import { Box } from '@mui/system'
import { useTheme } from 'styled-components'
import { Typography } from '@mui/material'
import NotificationContext from '../context/NotificationContext'

const DetailedNote = ({ matchedNoteId }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const theme = useTheme()
  const { setNotification } = useContext(NotificationContext)
  const [modificationDisplay, setModificationDisplay] = useState(false)

  const note = useSelector((state) => {
    return state.notes.find((el) => el.id === matchedNoteId)
  })

  if (!note) return

  const label = note?.important ? 'make not important' : 'make important'

  const toggleImportanceOf = async (note) => {
    try {
      const changedNote = { ...note, important: !note.important }

      const response = await notesServices.update(changedNote.id, changedNote)

      dispatch(modifyNote(response))
    } catch (exception) {
      setNotification({ text: exception, type: 'error' })
      setTimeout(() => setNotification(null), 5000)
    }
  }

  const deleteNote = async (note) => {
    const confirm = window.confirm(
      `Are you sure you want to delete '${note.content}'?`
    )
    if (!confirm) return
    try {
      await notesServices.remove(note.id)
      dispatch(deleteFromStore(note))
      dispatch(setFilter('ALL'))
      navigate('/notes')
    } catch (exception) {
      setNotification({ text: exception, type: 'error' })
      setTimeout(() => setNotification(null), 5000)
    }
  }

  const toggleModification = (setModificationDisplay) => {
    const state = !modificationDisplay
    setModificationDisplay(state)
  }

  const dateOfCreation = new Date(note.date).toLocaleDateString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  return (
    <Box>
      <StyledPaper>
        {modificationDisplay ? (
          <ModificationForm
            note={note}
            setModificationDisplay={setModificationDisplay}
          />
        ) : (
          <div>
            <Typography
              variant='h4'
              sx={{ color: theme.palette.text.primary, mt: 3 }}
            >
              {note.content}
            </Typography>
            <Box textAlign='right' margin='10px'>
              <StyledButtonMainReverse
                onClick={() => toggleModification(setModificationDisplay)}
              >
                Change note
              </StyledButtonMainReverse>
            </Box>
          </div>
        )}
      </StyledPaper>
      <Box>
        <Box>
          <StyledButtonSecondary onClick={() => toggleImportanceOf(note)}>
            {label}
          </StyledButtonSecondary>{' '}
          <StyledButtonSecondary onClick={() => deleteNote(note)}>
            delete
          </StyledButtonSecondary>
          <p>was created on {dateOfCreation}</p>
          <p>{note.important}</p>
          <br />
        </Box>
        <Box>
          <StyledButtonSecondary
            onClick={() => {
              navigate('/notes')
              dispatch(setFilter('ALL'))
            }}
          >
            back to all notes
          </StyledButtonSecondary>
        </Box>
      </Box>
    </Box>
  )
}

export default DetailedNote
