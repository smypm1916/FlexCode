import React from "react";
import { Select_Style } from "../../style/Common_Style";

const Select = ({ className, options, onChange, defaultValue }) => {
  return (
    <Select_Style
      className={`custom-select-${className}`}
      onChange={onChange}
      defaultValue={defaultValue}
    >
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select_Style>
  );
};

export default Select;
