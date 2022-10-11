import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { modifyNote, deleteFromStore } from '../reducers/notesReducer'
import notesServices from '../services/notes'
import { useState } from 'react'
import ModificationForm from './ModificationForm'

const DetailedNote = ({ matchedNoteId }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [modificationDisplay, setModificationDisplay] = useState(false)

  const note = useSelector((state) => {
    return state.notes.find((el) => el.id === matchedNoteId)
  })

  if (!note) return

  const label = note?.important ? 'make not important' : 'make important'

  const toggleImportanceOf = async (note) => {
    const changedNote = { ...note, important: !note.important }

    const response = await notesServices.update(changedNote.id, changedNote)

    dispatch(modifyNote(response))
  }

  const deleteNote = async (note) => {
    console.log('trying delete', note)
    const confirm = window.confirm(
      `Are you sure you want to delete '${note.content}'?`
    )
    if (!confirm) return
    await notesServices.remove(note.id)
    dispatch(deleteFromStore(note))
    navigate('/')
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
    <div>
      {modificationDisplay ? (
        <ModificationForm
          note={note}
          setModificationDisplay={setModificationDisplay}
        />
      ) : (
        <div>
          <h3>{note.content}</h3>
          <button onClick={() => toggleModification(setModificationDisplay)}>
            Change note
          </button>{' '}
        </div>
      )}
      <button onClick={() => toggleImportanceOf(note)}>{label}</button>{' '}
      <button onClick={() => deleteNote(note)}>delete</button>
      <p>was created on {dateOfCreation}</p>
      <p>{note.important}</p>
      <br />
      <button
        onClick={() => {
          navigate('/')
        }}
      >
        back to all notes
      </button>
    </div>
  )
}

export default DetailedNote
