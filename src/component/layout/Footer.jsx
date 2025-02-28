import React from "react";
import style, { styled } from "styled-components";
const footer = styled.div`
  padding: 20px 15px;
`;

const Footer = () => {
  return (
    <div>
      <div className={footer}>
        <div className={style.footer_content}>
          <h3>Footer</h3>
        </div>
      </div>
    </div>
  );
};

export default Footer;
