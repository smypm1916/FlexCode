import React from "react";
import { Input_Style } from "../../style/Common_Style";

const FileUpload = ({ onChange }) => {
  return <Input_Style type="file" onChange={onChange} />;
};

export default FileUpload;
