import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    font-family: 'Quattrocento Sans', sans-serif;
    box-sizing: border-box;
  }

  h1 {
    font-family: 'Quattrocento', serif;
  }
  
  h2, h3 {
    font-family:  'Quattrocento Sans', sans-serif;
  }

  a {
    text-decoration: none;
    margin: 0;
  }

  li {
    list-style-type: none;
  }

  button {
    border: 1px solid #ccc;
    background: none;
    padding: 12px 10px;
    margin: 10px;
    border-radius: 5px;
    cursor: pointer;
    
    &:hover {
      background: #2b3b4a;
      color: white;
    }
  }
`;

export default GlobalStyle;
