import React from 'react'
// import { useState } from 'react'
import { IconButton } from '@mui/material'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'

const ModeSwitchButton = ({ setTheme, theme }) => {
  const checked = theme === 'dark' ? true : false

  const handleChange = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    window.localStorage.setItem('notesAppTheme', newTheme)
  }

  return (
    <IconButton checked={checked} onClick={handleChange} color='inherit'>
      {checked ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  )
}

export default ModeSwitchButton
