import React from 'react'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

const Notification = ({ notification }) => {
  console.log(notification)
  if (notification === null) {
    return null
  }
  const message =
    notification.type === 'error'
      ? notification.text.response.data.error
      : notification.text

  return (
    <Snackbar
      open={true}
      sx={{ height: '150%' }}
      anchorOrigin={{
        vertical: 'top',

        horizontal: 'left',
      }}
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
