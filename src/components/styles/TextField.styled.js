import styled from 'styled-components'
import TextField from '@mui/material/TextField'

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: ({ theme }) => theme.palette.text.primary,
  },
  '& .MuiOutlinedInput-root': {
    color: ({ theme }) => theme.palette.text.primary,
  },
  '& .MuiFormLabel-root': {
    color: ({ theme }) => theme.palette.text.primary,
  },
  '& .css-7209ej-MuiInputBase-input-MuiFilledInput-input': {
    color: ({ theme }) => theme.palette.text.primary,
  },
})

export default StyledTextField
