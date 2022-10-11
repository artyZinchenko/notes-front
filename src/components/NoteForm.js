import React from 'react'
import notesServices from '../services/notes'
import { useDispatch } from 'react-redux'
import { addNoteToStore } from '../reducers/notesReducer'
import { useNavigate } from 'react-router-dom'

const NoteForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const setNote = async (event) => {
    event.preventDefault()
    const noteContent = event.target.note.value
    event.target.note.value = ''
    const newNote = { content: noteContent, important: false }

    const response = await notesServices.create(newNote)

    dispatch(addNoteToStore(response))
    navigate('/')
  }

  return (
    <div className='formDiv'>
      <h2>Create a new note</h2>
      <form onSubmit={setNote}>
        <input name='note' placeholder='enter text...' />
        <button type='submit'>save</button>
        <br />
        <button
          onClick={() => {
            navigate('/')
          }}
        >
          back to all notes
        </button>
      </form>
    </div>
  )
}

export default NoteForm
