import React from 'react'
import Note from './Note'
import { useDispatch, useSelector } from 'react-redux'
import { toggleImportance, deleteFromStore } from '../reducers/notesReducer'
import notesServices from '../services/notes'

const NoteList = () => {
  const dispatch = useDispatch()

  const notesToShow = useSelector((state) => {
    if (state.filter === 'ALL') return state.notes
    return state.filter === 'IMPORTANT'
      ? state.notes.filter((el) => el.important)
      : state.notes.filter((el) => !el.important)
  })

  const toggleImportanceOf = async (note) => {
    const changedNote = { ...note, important: !note.important }

    const response = await notesServices.update(changedNote.id, changedNote)

    dispatch(toggleImportance(response))
  }

  const deleteNote = async (note) => {
    const confirm = window.confirm(
      `Are you sure you want to delete '${note.content}'?`
    )
    if (!confirm) return
    await notesServices.remove(note.id)
    dispatch(deleteFromStore(note))
  }

  return (
    <ul>
      {notesToShow.map((note) => (
        <Note
          key={note.id}
          note={note}
          toggleImportance={() => toggleImportanceOf(note)}
          deleteNote={() => deleteNote(note)}
        />
      ))}
    </ul>
  )
}

export default NoteList
