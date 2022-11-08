import React, { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { modifyNote } from '../reducers/notesReducer'
import notesServices from '../services/notes'
import { useState } from 'react'
import StyledTextField from './styles/TextField.styled'
import Box from '@mui/system/Box'
import { StyledButtonMainReverse } from './styles/Buttons.styled'
import NotificationContext from '../context/NotificationContext'

const ModificationForm = ({ note, setShowModificationForm }) => {
  const dispatch = useDispatch()
  const { setNotification } = useContext(NotificationContext)

  const [text, setText] = useState(note.content)
  const setNote = async (event) => {
    event.preventDefault()
    const changedNote = {
      ...note,
      content: text,
    }
    try {
      const response = await notesServices.update(changedNote.id, changedNote)

      dispatch(modifyNote(response))
      setShowModificationForm(false)
    } catch (exception) {
      setNotification({ text: exception, type: 'error' })
      setTimeout(() => setNotification(null), 5000)
    }
  }

  const handleChange = (event) => {
    const newText = event.target.value
    setText(newText)
  }

  const handleCancel = () => {
    setShowModificationForm(false)
  }

  return (
    <Box sx={{ marginBlock: '20px' }}>
      <form onSubmit={setNote}>
        <StyledTextField
          fullWidth
          label='Change your note'
          id='fullWidth'
          name='note'
          value={text}
          onChange={handleChange}
          multiline
          sx={{ marginBlock: '20px' }}
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <StyledButtonMainReverse onClick={handleCancel}>
            Cancel changes
          </StyledButtonMainReverse>
          <StyledButtonMainReverse type='submit'>
            Save changes
          </StyledButtonMainReverse>
        </Box>
      </form>
    </Box>
  )
}

export default ModificationForm
