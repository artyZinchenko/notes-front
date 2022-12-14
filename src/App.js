import React from 'react'
import { useState, useEffect } from 'react'
import { Route, Routes, useMatch, useNavigate } from 'react-router-dom'

import noteService from './services/notes'
import Notification from './components/Notification'
import { ThemeProvider } from 'styled-components'
import GlobalStyles from './components/styles/Global'
import { darkTheme, lightTheme } from './components/styles/Themes'
import { StyledEngineProvider } from '@mui/material/styles'

import Header from './components/Header'
import Footer from './components/Footer'
import loginService from './services/login'
import userService from './services/users'
import NoteForm from './components/NoteForm'

import NotesList from './components/NotesList'
import DetailedNote from './components/DetailedNote'
import LoginPage from './components/LoginPage'
import ProtectedRoute from './components/ProtectedRoute'
import Controls from './components/Controls'

import { initializeNotes } from './reducers/notesReducer'
import { useDispatch } from 'react-redux'

import { Box } from '@mui/system'
import { Container } from '@mui/material'
import HomePage from './components/HomePage'
import NotificationContext from './context/NotificationContext'
import SignUp from './components/SignUpPage'
import CircularModal from './components/CircularModal'

const App = () => {
  const inputGlobalStyles = <GlobalStyles />
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const localStorageUser = localStorage.getItem('loggedNoteappUser')
  const currentUser = localStorageUser ? JSON.parse(localStorageUser) : null

  const [theme, setTheme] = useState('light')
  const [notification, setNotification] = useState(null)
  const [user, setUser] = useState(currentUser)
  const [loading, setLoading] = useState(false)
  const value = { notification, setNotification }

  useEffect(() => {
    if (user) {
      noteService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    const currentTheme = localStorage.getItem('notesAppTheme')

    if (currentTheme) {
      setTheme(currentTheme)
    }
  })

  useEffect(() => {
    if (user) {
      try {
        dispatch(initializeNotes()), [dispatch]
      } catch (exception) {
        setNotification({ type: 'error', text: exception })
        setTimeout(() => setNotification(null), 5000)
      }
    }
  }, [user])

  const handleLogin = async (credentials, afterSignup = false) => {
    setLoading(true)
    try {
      const user = await loginService.login(credentials)
      setUser(user)
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      noteService.setToken(user.token)
      !afterSignup &&
        setNotification({
          text: `${credentials.username} logged in `,
          type: 'success',
        })
      setTimeout(() => setNotification(null), 5000)
      navigate('/notes')
    } catch (exception) {
      setNotification({ type: 'error', text: exception })
      setTimeout(() => setNotification(null), 3000)
    } finally {
      setLoading(false)
    }
  }

  const handleSignup = async (credentials) => {
    setLoading(true)
    try {
      await userService.createUser(credentials)
      setNotification({
        text: `${credentials.username}'s account created `,
        type: 'success',
      })

      setTimeout(() => setNotification(null), 5000)
    } catch (exception) {
      setNotification({ type: 'error', text: exception })
      setTimeout(() => setNotification(null), 3000)

      throw exception
    } finally {
      setLoading(false)
    }
  }

  const match = useMatch('/notes/:id')
  const matchedNoteId = match ? match.params.id : null

  return (
    <StyledEngineProvider injectFirst>
      <NotificationContext.Provider value={value}>
        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
          {inputGlobalStyles}
          <Box
            sx={{
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              margin: '0px',
              padding: '0px',
            }}
          >
            <Header
              setUser={setUser}
              user={user}
              setTheme={setTheme}
              theme={theme}
            />
            <Container
              sx={{
                minHeight: '70vh',
              }}
            >
              <Notification
                notification={notification}
                setNotification={setNotification}
              />

              <Routes>
                <Route path='/' element={<HomePage user={user} />} />
                <Route
                  path='/login'
                  element={<LoginPage handleLogin={handleLogin} />}
                />
                <Route
                  path='/signup'
                  element={
                    <SignUp
                      handleLogin={handleLogin}
                      handleSignup={handleSignup}
                    />
                  }
                />
                <Route element={<ProtectedRoute user={user} />}>
                  <Route
                    path='/notes'
                    element={
                      <>
                        <Controls />
                        <NotesList />
                      </>
                    }
                  />
                  <Route
                    path='/notes/:id'
                    element={<DetailedNote matchedNoteId={matchedNoteId} />}
                  />
                  <Route path='/create' element={<NoteForm />} />
                </Route>
              </Routes>
            </Container>
            <CircularModal show={loading} />
            <Footer />
          </Box>
        </ThemeProvider>
      </NotificationContext.Provider>
    </StyledEngineProvider>
  )
}

export default App
