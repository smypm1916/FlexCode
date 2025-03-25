import React from "react";
import ReactModal from "react-modal";
import { Title } from "../../style/Modal_Style";
import Button from "./Button";
import { Container_Modal, Modal_Wrapper } from "../../style/Common_Style";
ReactModal.setAppElement("#root");

const CartModal = ({ isOpen, onClose, goToOrder }) => {
  if (!isOpen) return null;

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
    >
      <Modal_Wrapper>
        <Title>장바구니에 추가 되었습니다</Title>

        {/* 장바구니 상품 리스트 */}
        {/* <div> */}
        {/* <CheckedProduct cartItems={cartItems} /> */}
        {/* </div> */}
        <div>
          <Button btnTxt="주문하기" onClick={goToOrder} />
        </div>
        <div>
          <Button onClick={onClose} btnTxt="닫기"></Button>
        </div>
      </Modal_Wrapper>
    </ReactModal>
  );
};

export default CartModal;
