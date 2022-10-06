import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Togglable from './Togglable'

// npm test -- src/components/Togglable.test.js

describe('testing togglable', () => {
  let container
  beforeEach(() => {
    container = render(
      <Togglable buttonLabel='show...'>
        <div className='testDiv'>togglable</div>
      </Togglable>
    ).container
  })
  test('renders its chilren', async () => {
    await screen.findAllByText('togglable')
  })
  test('at start children are not displayed', () => {
    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })
  test('after clicking the button children are displayed', async () => {
    const button = screen.getByText('show...')
    const div = container.querySelector('.togglableContent')
    const user = userEvent.setup()
    await user.click(button)

    expect(div).not.toHaveStyle('display: none')
  })

  test('toggled content can be closed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show...')
    await user.click(button)

    const closingButton = screen.getByText('cancel')
    await user.click(closingButton)

    const div = container.querySelector('.togglableContent')

    expect(div).toHaveStyle('display: none')
  })
})
