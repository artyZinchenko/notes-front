import React from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import { Modal, Box } from '@mui/material'

const CircularModal = ({ show }) => {
  console.log(show)
  return (
    <Modal open={show}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <CircularProgress size={100} color='primary' thickness={5} />
      </Box>
    </Modal>
  )
}

export default CircularModal
