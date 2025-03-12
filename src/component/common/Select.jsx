import React from "react";
import styled from "styled-components";

const Select_style = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 10px;
`;

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
    <select
      className={`custom-select-${className}`}
      onChange={onChange}
      defaultValue={defaultValue}
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
    </select>
  );
};

export default Select;
