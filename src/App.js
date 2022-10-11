import React from 'react'
import { useState, useEffect } from 'react'
import { Route, Routes, useMatch, Link } from 'react-router-dom'

import noteService from './services/notes'
import Notification from './components/Notification'
import { ThemeProvider } from 'styled-components'
import GlobalStyles from './components/styles/Global'
import Header from './components/Header'
import Footer from './components/Footer'
import loginService from './services/login'
import NoteForm from './components/NoteForm'
import Filter from './components/Filter'
import NotesList from './components/NotesList'
import DetailedNote from './components/DetailedNote'

import { initializeNotes } from './reducers/notesReducer'
import { useDispatch } from 'react-redux'

import { Container } from './components/styles/Container.styled'

const theme = {
  colors: {
    header: '#ebfbff',
    body: '#fff',
    footer: '#003333',
  },
}

const App = () => {
  const dispatch = useDispatch()

  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    dispatch(initializeNotes()), [dispatch]
  })

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('loggedNoteappUser')

    const user = JSON.parse(loggedUserJSON)
    if (user) {
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [dispatch])

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      setUser(user)
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      noteService.setToken(user.token)
    } catch (exception) {
      setErrorMessage('Wrong Credentials')
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const match = useMatch('/notes/:id')
  const matchedNoteId = match ? match.params.id : null

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Header handleLogin={handleLogin} user={user} />
      <Container>
        <Notification message={errorMessage} />
        <Routes>
          <Route
            path='/'
            element={
              <>
                <Link to='/create'>
                  <button>Create new note</button>
                </Link>
                <Filter />
                <NotesList />
              </>
            }
          />
          <Route
            path='/notes/:id'
            element={<DetailedNote matchedNoteId={matchedNoteId} />}
          />
          <Route path='/create' element={<NoteForm />} />
        </Routes>
        <Footer />
      </Container>
    </ThemeProvider>
  )
}

export default App
