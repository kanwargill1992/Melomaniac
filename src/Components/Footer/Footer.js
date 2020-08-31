import React from "react";
import styled from "styled-components";
import Animation from "./Animation";

export default () => {
  return (
    <Footer>
      <FootWrapper>
        <Animation />
      </FootWrapper>
    </Footer>
  );
};

const Footer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  height: 7vh;
  background-color: #ec407a;
  width: 100%;
`;

const FootWrapper = styled.div`
  margin-left: 0.7rem;
  margin-top: 0.5rem;
`;
