import React, { useState } from "react";
import DaumPostcodeEmbed from "react-daum-postcode";
import Button from "../common/Button";
import { Post_Modal_Wrapper } from "../../style/Common_Style";

const PostCodeModal = ({ onClose, onSelectAddress }) => {
  const completeHandler = (data) => {
    console.log(data);
    const fullAddress = `(${data.zonecode})${data.roadAddress}`;
    onSelectAddress(fullAddress);
    onClose();
  };

  return (
    <Post_Modal_Wrapper>
      <DaumPostcodeEmbed onComplete={completeHandler} />
      {/* <Button
        className={"addressModalClose"}
        btnTxt={"닫기"}
        onClick={onClose}
      /> */}
    </Post_Modal_Wrapper>
  );
};

export default PostCodeModal;
