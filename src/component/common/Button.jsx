import React from "react";
import { Button_Style } from "../../style/Common_Style";

const Button = ({ type, className, btnTxt, onClick }) => {
  return (
    <Button_Style
      type={type}
      className={`custom-button-${className}`}
      onClick={onClick}
    >
      {btnTxt}
    </Button_Style>
  );
};

export default Button;
