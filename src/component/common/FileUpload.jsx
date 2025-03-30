import React from "react";
import { Input_Style } from "../../style/Common_Style";

const FileUpload = ({ accpet, onChange }) => {
  return <Input_Style type="file" accept={accpet} onChange={onChange} />;
};

export default FileUpload;
