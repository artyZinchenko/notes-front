import { createTheme } from '@mui/material'

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#F8F9FA',
      header: '#edede9',
    },
    boxes: {
      darkBox: '#4d4c5e',
      lightBox: '#edede9',
    },
    niceColor: {
      blue: '#3b82f6',
    },
    text: {
      primary: '#243649',
      reverse: '#FFFFFF',
    },
  },
})
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#343a40',
      header: '#252323',
    },
    boxes: {
      darkBox: 'darkgray',
      lightBox: '#5B616A',
    },
    text: {
      primary: '#FFFFFF',
      reverse: '#141115',
    },
    niceColor: {
      blue: '#3b82f6',
    },
  },
})
