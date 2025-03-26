import React from "react";
import styled from "styled-components";
const FooterContainer = styled.div`
  padding: 20px;
  width: 100vw;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: black;
  font-size: 10pt;
  border-top: 1px solid black;
  transition: all 0.5s;
  &:hover {
    background-color: #d9d9d9;
  }
`;

const Footer_Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <Footer_Content>2025 Final Project</Footer_Content>
      <Footer_Content>
        © 2025 Your Company Name. All rights reserved.
      </Footer_Content>
    </FooterContainer>
  );
};

export default Footer;
