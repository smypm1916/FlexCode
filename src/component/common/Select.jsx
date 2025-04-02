import React from "react";
import { Select_Style } from "../../style/Common_Style";

const Select = ({
  className,
  options = [],
  onChange,
  defaultValue,
  disabled,
}) => {
  return (
    <Select_Style
      className={`custom-select-${className}`}
      onChange={onChange}
      defaultValue={defaultValue}
      disabled={disabled}
    >
      {Array.isArray(options) ? (
        options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))
      ) : (
        <option value="">None</option>
      )}
    </Select_Style>
  );
};

export default Select;
