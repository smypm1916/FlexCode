import React from "react";

const Button = ({ className, btnTxt, onClick }) => {
  return (
    <button className={`custom-button ${className}`} onClick={onClick}>
      {btnTxt}
    </button>
  );
};

export default Button;
