import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import NoteForm from '../components/NoteForm'

// npm test -- src/components/NoteForm.test.js

test('<NoteForm /> updates parent state and calls onSubmit', async () => {
  const createNote = jest.fn()
  const user = userEvent.setup()
  render(<NoteForm createNote={createNote} />)

  const textInput = screen.getByPlaceholderText('enter text...')
  const sunbmitBtn = screen.getByText('save')

  await user.type(textInput, 'testing')
  await user.click(sunbmitBtn)

  expect(createNote.mock.calls).toHaveLength(1)
  expect(createNote.mock.calls[0][0].content).toBe('testing')
})
