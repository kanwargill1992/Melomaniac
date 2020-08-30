import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    font-family: 'Caveat', cursive;
    box-sizing: border-box;
  }

  h1 {
    font-family: 'Caveat', cursive;
  }
  
  h2, h3 {
    font-family: 'Caveat', cursive;
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
      background: #00c9ff;
      color: white;
    }
  }
`;

export default GlobalStyle;
