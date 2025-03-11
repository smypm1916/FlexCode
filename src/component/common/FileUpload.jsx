import React from "react";

const FileUpload = ({ accpet, onChange }) => {
  return <input type="file" accept={accpet} onChange={onChange} />;
};

export default FileUpload;
