import React from "react";
import { Select_Style } from "../../style/Common_Style";

// const Select = ({ className, options, onChange, defaultValue }) => {
//   return (
//     <select
//       className={`custom-select-${className}`}
//       onChange={onChange}
//       defaultValue={defaultValue}
//     >
//       {options.map((option, index) => (
//         <option key={index} value={option.value}>
//           {option.label}
//         </option>
//       ))}
//     </select>
//   );
// };
const Select = ({ className, options = [], onChange, defaultValue }) => {
  return (
    <Select_Style
      className={`custom-select-${className}`}
      onChange={onChange}
      defaultValue={defaultValue || ""}
    >
      {Array.isArray(options) ? (
        options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))
      ) : (
        <option value="">데이터 없음</option>
      )}
    </Select_Style>
  );
};

export default Select;
