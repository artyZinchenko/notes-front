import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Bigelow+Rules&family=Inter&family=Lato:wght@100;300&family=Newsreader:opsz@6..72&family=Permanent+Marker&family=Poppins&family=Roboto&family=Roboto+Mono&display=swap');
  
  * {
    box-sizing: border-box;
  }

  body {
    background: ${({ theme }) => theme.colors.body};
    color: hsl(192, 100%, 9%);
    font-family: 'Poppins', sans-serif;
    font-size: 1.15em;
    margin: 0;
  }

  h1{
    max-width: fit-content;
  }

  p {
    opacity: 0.6;
    line-height: 1.5;
  }

  img {
    max-width: 100%;
  }

  a {
  color: inherit; 
  text-decoration: inherit; 
}

`
export default GlobalStyles
