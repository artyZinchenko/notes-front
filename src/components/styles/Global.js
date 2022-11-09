import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  
  * {
    box-sizing: border-box;
  }

  body {
    background: ${({ theme }) => theme.palette.background.default};
    color: ${({ theme }) => theme.palette.text.primary};
    font-family: 'Roboto', sans-serif;
    font-size: 1.15em;
    margin: 0;
  }

  p {
    opacity: 0.6;
    line-height: 1.5;
  }

  a {
  color: ${({ theme }) => theme.palette.text.primary}; 
  text-decoration: none; 
}
 

`
export default GlobalStyles
