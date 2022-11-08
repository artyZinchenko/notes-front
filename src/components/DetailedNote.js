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
import Description from './Description'

const DetailedNote = ({ matchedNoteId }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const theme = useTheme()
  const { setNotification } = useContext(NotificationContext)
  const [showModificationForm, setShowModificationForm] = useState(false)
  const [showDescription, setShowDescription] = useState(false)

  const note = useSelector((state) => {
    return state.notes.find((el) => el.id === matchedNoteId)
  })

  if (!note) return

  const label = note?.important ? 'make unimportant' : 'make important'

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

  const toggleNoteModification = (setShowModificationForm) => {
    const state = !showModificationForm
    setShowModificationForm(state)
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
        {showModificationForm ? (
          <ModificationForm
            note={note}
            setShowModificationForm={setShowModificationForm}
          />
        ) : (
          <div>
            <Typography
              variant='h6'
              sx={{ color: theme.palette.text.primary, mt: 3 }}
            >
              {note.content}
            </Typography>
            <Box textAlign='right' margin='10px'>
              <StyledButtonMainReverse
                onClick={() => toggleNoteModification(setShowModificationForm)}
              >
                Change note
              </StyledButtonMainReverse>
            </Box>
          </div>
        )}
      </StyledPaper>
      <Box>
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <StyledButtonSecondary onClick={() => toggleImportanceOf(note)}>
              {label}
            </StyledButtonSecondary>{' '}
            <StyledButtonSecondary onClick={() => deleteNote(note)}>
              delete
            </StyledButtonSecondary>
            <StyledButtonSecondary
              onClick={() => {
                navigate('/notes')
                dispatch(setFilter('ALL'))
              }}
            >
              back to notes
            </StyledButtonSecondary>
          </Box>
          <p>was created on {dateOfCreation}</p>
          <StyledButtonSecondary
            onClick={() => {
              setShowDescription(!showDescription)
            }}
          >
            {showDescription ? 'hide description' : 'show description'}
          </StyledButtonSecondary>
          {showDescription && (
            <Description note={note} setShowDescription={setShowDescription} />
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default DetailedNote
