import React from "react";

const Select = ({ className, options, onChange, defaultValue }) => {
  return (
    <select
      className={`custom-select ${className}`}
      onChange={onChange}
      defaultValue={defaultValue}
    >
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
