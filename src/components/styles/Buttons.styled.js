import Button from '@mui/material/Button'
import styled from 'styled-components'

export const StyledButtonMain = styled(Button)({
  color: ({ theme }) => theme.palette.text.primary,

  border: `2px ${({ theme }) => theme.palette.text.primary} solid`,

  backgroundColor: ({ theme }) => theme.palette.text.primary,

  padding: '5px 15px',

  margin: '10px',
  '&:hover': {
    transform: 'scale3d(1.05, 1.05, 1)',
    backgroundColor: ({ theme }) => theme.palette.background.header,
    color: ({ theme }) => theme.palette.text.reverse,
  },
})

export const StyledButtonMainReverse = styled(Button)({
  color: ({ theme }) => theme.palette.text.reverse,

  backgroundColor: ({ theme }) => theme.palette.boxes.darkBox,
  padding: '5px 15px',

  '&:hover': {
    transform: 'scale3d(1.05, 1.05, 1)',
    backgroundColor: ({ theme }) => theme.palette.boxes.darkBox,
    color: ({ theme }) => theme.palette.text.reverse,
  },
})

export const StyledButtonSecondary = styled(Button)`
  background-color: ${({ theme }) => theme.palette.boxes.lightBox};
  padding: 5px 15px;
  margin: 10px;
  color: ${({ theme }) => theme.palette.text.primary};
`
