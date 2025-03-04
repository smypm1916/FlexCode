import React from 'react';

//  input 태그에 사용

const TextInput = ({ type, label, placeholder, value, onChange }) => {
   return (
      <div className={`text-input-${className}`} >
         <label>{label}</label>
         <input type={type} placeholder={placeholder} value={value} onChange={onChange} />
      </div >
   );
};

export default TextInput;  