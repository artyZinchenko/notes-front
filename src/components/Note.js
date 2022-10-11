import React from 'react'
import { Link } from 'react-router-dom'

const Note = ({ note }) => {
  return (
    <li className='note'>
      <Link to={`/notes/${note.id}`}>
        <span>{note.content}</span>
      </Link>
    </li>
  )
}

export default Note
