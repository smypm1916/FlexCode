import React from "react";
import style, { styled } from "styled-components";
const FooterContainer = styled.div`
  min-width: 100vw;
  width: fit content;
`;
const Ffooter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items;
  height: 100px;
  background: #d9d9d9;
  padding: 20px 15px;
  color: black;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <Ffooter>
        <div className={style.footer_content}>
          <h3>Footer</h3>
        </div>
      </Ffooter>
    </FooterContainer>
  );
};

export default Footer;
