import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Note from './Note'

test('renders content', async () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true,
  }

  render(<Note note={note} />)

  const element = await screen.findByText(
    'Component testing is done with react-testing-library',
    { exact: false }
  )
  expect(element).toBeDefined()
})

test('renders content/ testing with container', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true,
  }

  const { container } = render(<Note note={note} />)

  const div = container.querySelector('.note')

  screen.debug(div)

  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
})

test('debug showcase', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true,
  }

  render(<Note note={note} />)
  const element = screen.getByText(
    'Component testing is done with react-testing-library'
  )

  screen.debug(element)
})

test('clicking the button calls event handler once', async () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true,
  }

  const mockHandler = jest.fn()

  render(<Note note={note} toggleImportance={mockHandler} />)

  const user = userEvent.setup()
  const button = screen.getByText('make not important')
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
  // const note = {
  //   content: 'Component testing is done with react-testing-library',
  //   important: true,
  // }
  // const mockFunction = jest.fn()

  // render(<Note note={note} toggleImportance={mockFunction} />)
  // const button = screen.getByText('make not important')

  // const user = userEvent.setup()
  // await user.click(button)

  // expect(mockFunction.mock.calls).toHaveLength(1)
})
