import React from 'react'
import { useDispatch } from 'react-redux'
import { modifyNote } from '../reducers/notesReducer'
import notesServices from '../services/notes'
import { useState } from 'react'

const ModificationForm = ({ note, setModificationDisplay }) => {
  const dispatch = useDispatch()

  const [text, setText] = useState(`${note.content}`)
  const setNote = async (event) => {
    event.preventDefault()
    const changedNote = {
      ...note,
      content: text,
    }
    const response = await notesServices.update(changedNote.id, changedNote)

    dispatch(modifyNote(response))
    setModificationDisplay(false)
  }

  const handleChange = (event) => {
    const newText = event.target.value
    setText(newText)
  }

  return (
    <form onSubmit={setNote}>
      <input name='note' value={text} onChange={handleChange} />
      <button type='submit'>Save changes</button>
    </form>
  )
}

export default ModificationForm
