import React from "react";
import DaumPostcodeEmbed from "react-daum-postcode";
import Button from "../common/Button";
import {
  Container_Modal,
  Modal_Wrapper,
  Post_Modal_Wrapper,
} from "../../style/Common_Style";

const PostCodeModal = ({ onClose, onSelectAddress }) => {
  const completeHandler = (data) => {
    console.log(data);
    const fullAddress = `(${data.zonecode})${data.roadAddress}`;
    onSelectAddress(fullAddress);
    onClose();
  };

  return (
    <Container_Modal>
      <Modal_Wrapper>
        <DaumPostcodeEmbed onComplete={completeHandler} />
        <Button
          className={"addressModalClose"}
          btnTxt={"CLOSE"}
          onClick={onClose}
        />
      </Modal_Wrapper>
    </Container_Modal>
  );
};

export default PostCodeModal;
