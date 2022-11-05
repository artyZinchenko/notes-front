import Paper from '@mui/material/Paper'
import styled from 'styled-components'

const StyledPaper = styled(Paper)({
  backgroundColor: ({ theme }) => theme.palette.boxes.lightBox,
})

export default StyledPaper
