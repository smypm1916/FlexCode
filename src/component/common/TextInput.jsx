import React from "react";
import { Input_Style } from "../../style/Common_Style";

//  input 태그에 사용

const TextInput = ({ type, name, placeholder, value, onChange, onKeyDown, maxLength }) => {
  return (
    <Input_Style
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      maxLength={maxLength}
    />
  );
};

export default TextInput;
