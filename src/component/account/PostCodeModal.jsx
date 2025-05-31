import DaumPostcodeEmbed from "react-daum-postcode";
import {
  Container_Modal,
  Modal_Wrapper
} from "../../style/Common_Style";
import Button from "../common/Button";

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
          btnTxt={"閉じる"}
          onClick={onClose}
        />
      </Modal_Wrapper>
    </Container_Modal>
  );
};

export default PostCodeModal;
