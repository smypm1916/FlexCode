import React from "react";
import style, { styled } from "styled-components";
const FooterContainer = styled.div`
  min-width: 100%;
  width: fit content;
`;
const Ffooter = styled.div`
  height: 100px;
  background: #white;
  padding: 20px 15px;
  color: black;
  transition: all 0.5s;
  border-top: 1px solid black;
  font-size: 15pt;
  font-weight: bold;
  &:hover {
    font-size: 20pt;
    background-color: #d9d9d9;
  }
`;

const Footer_Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <Ffooter>
        <Footer_Content>팀원 : 윤성민, 박채은, 함유진, 이민재</Footer_Content>
      </Ffooter>
    </FooterContainer>
  );
};

export default Footer;
