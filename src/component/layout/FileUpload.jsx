import React from 'react';

const FileUpload = ({ label, onChange }) => {
   return (
      <div>
         <div>
            <label>{label}</label>
            <input type="file" onChange={onChange} />
         </div>
      </div>
   );
};

export default FileUpload;