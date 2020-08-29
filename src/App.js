import React from "react";
import styled from "styled-components";

import GlobalStyle from "./Globalstyle";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

function App() {
  return (
    <Wrapper>
      <GlobalStyle />

      <Header />

      <Footer />
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div``;

// const HeadWrapper = styled.div`
//   grid-area: Header;
//   display: flex;
//   flex-direction: column;
//   position: sticky;
//   top: 0;
//   background-color: #00bfff;
// `;

// const ContentWrapper = styled.div`
//   grid-area: Content;
// `;

// const FootWrapper = styled.div`
//   grid-area: Footer;
//   background-color: #00bfff;
// `;
