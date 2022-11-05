import React, { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { modifyNote } from '../reducers/notesReducer'
import notesServices from '../services/notes'
import { useState } from 'react'
import StyledTextField from './styles/TextField.styled'
import Box from '@mui/system/Box'
import { StyledButtonMainReverse } from './styles/Buttons.styled'
import NotificationContext from '../context/NotificationContext'

const ModificationForm = ({ note, setModificationDisplay }) => {
  const dispatch = useDispatch()
  const { setNotification } = useContext(NotificationContext)

  const [text, setText] = useState(`${note.content}`)
  const setNote = async (event) => {
    event.preventDefault()
    const changedNote = {
      ...note,
      content: text,
    }
    try {
      const response = await notesServices.update(changedNote.id, changedNote)

      dispatch(modifyNote(response))
      setModificationDisplay(false)
    } catch (exception) {
      setNotification({ text: exception, type: 'error' })
      setTimeout(() => setNotification(null), 5000)
    }
  }

  const handleChange = (event) => {
    const newText = event.target.value
    setText(newText)
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
        <Box textAlign='right' margin='10px'>
          <StyledButtonMainReverse type='submit'>
            Save changes
          </StyledButtonMainReverse>
        </Box>
      </form>
    </Box>
  )
}

export default ModificationForm
