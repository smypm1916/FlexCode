import React from "react";
import DaumPostcodeEmbed from "react-daum-postcode";

const PostCodeModal = ({ onClose, onSelectAddress }) => {
  const completeHandler = (data) => {
    console.log(data);
    const fullAddress = `(${data.zonecode})${data.roadAddress}`;
    onSelectAddress(fullAddress);
    onClose();
  };

  return (
    <div>
      <DaumPostcodeEmbed onComplete={completeHandler} />
      {/* <Button
        className={"addressModalClose"}
        btnTxt={"닫기"}
        onClick={onClose}
      /> */}
    </div>
  );
};

export default PostCodeModal;
