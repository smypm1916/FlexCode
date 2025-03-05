import React from "react";
import styled from "styled-components";

const Button_Style = styled.button`
  padding: 10px;
  border: 1px solid black;
  transition: all 0.5s;
  color: black;
  background-color: white;
  text-decoration: none;
  font-size: 12pt;
  &:hover {
    background-color: black;
    color: white;
    text-decoration: none;
  }
`;

const Button = ({ className, btnTxt, onClick }) => {
  return (
    <Button_Style className={`custom-button-${className}`} onClick={onClick}>
      {btnTxt}
    </Button_Style>
  );
};

export default Button;
