import React from 'react'
import { useState, useEffect, useRef } from 'react'

import noteService from './services/notes'
import Notification from './components/Notification'
import { ThemeProvider } from 'styled-components'
import GlobalStyles from './components/styles/Global'
import Header from './components/Header'
import Footer from './components/Footer'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import Togglable from './components/Togglable'
import Filter from './components/Filter'
import NotesList from './components/NotesList'
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
  }, [])

  const noteFormRef = useRef()

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

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Header />
      <Container>
        <Notification message={errorMessage} />
        {user === null ? (
          <Togglable buttonLabel='login'>
            <LoginForm handleLogin={handleLogin} />
          </Togglable>
        ) : (
          <div>
            <p>{user.name} logged-in</p>
            <Togglable buttonLabel='new Note' ref={noteFormRef}>
              <NoteForm />
            </Togglable>
          </div>
        )}
        <Filter />
        <NotesList />
        <Footer />
      </Container>
    </ThemeProvider>
  )
}

export default App
