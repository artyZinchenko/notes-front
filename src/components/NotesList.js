import React from 'react'
import Note from './Note'
import { useSelector } from 'react-redux'

const NoteList = () => {
  const notesToShow = useSelector((state) => {
    console.log(state)
    if (state.filter === 'ALL') return state.notes
    return state.filter === 'IMPORTANT'
      ? state.notes.filter((el) => el.important)
      : state.notes.filter((el) => !el.important)
  })

  return (
    <ul>
      {notesToShow.map((note) => (
        <Note key={note.id} note={note} />
      ))}
    </ul>
  )
}

export default NoteList
