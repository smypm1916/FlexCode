import React from "react";
import { Button_Style } from "../../style/Common_Style";

const Button = ({ className, btnTxt, onClick }) => {
  return (
    <Button_Style className={`custom-button-${className}`} onClick={onClick}>
      {btnTxt}
    </Button_Style>
  );
};

export default Button;
