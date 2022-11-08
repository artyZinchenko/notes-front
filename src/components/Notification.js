import React from 'react'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

const Notification = ({ notification, setNotification }) => {
  if (notification === null) {
    return null
  }
  const message =
    notification.type === 'error'
      ? notification.text.response?.data?.error || null
      : notification.text

  return (
    <Snackbar
      open={true}
      sx={{ height: '170%' }}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      onClick={() => setNotification(null)}
    >
      <Alert
        variant='filled'
        severity={notification.type || 'error'}
        sx={{ width: '50vw' }}
      >
        {message}
      </Alert>
    </Snackbar>
  )
}

export default Notification
