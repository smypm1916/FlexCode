import React from 'react';

const FileUpload = ({ label, onChange }) => {
   return (
      <div className="file-upload">
         <label>{label}</label>
         <input type="file" onChange={onChange} />
      </div>
   );
};

export default FileUpload;