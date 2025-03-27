import React from "react";
import ReactModal from "react-modal";
import { Title } from "../../style/Modal_Style";
import Button from "./Button";
import {
  Button_Wrapper_100,
  Container_Modal,
  Modal_Wrapper,
} from "../../style/Common_Style";
ReactModal.setAppElement("#root");

const CartModal = ({ isOpen, onClose, goToOrder }) => {
  if (!isOpen) return null;

  return (
    <Container_Modal>
      <Modal_Wrapper>
        <ReactModal
          isOpen={isOpen}
          onRequestClose={onClose}
          shouldCloseOnOverlayClick={true}
          shouldCloseOnEsc={true}
        >
          <Title>장바구니에 추가 되었습니다</Title>

          {/* 장바구니 상품 리스트 */}
          {/* <div> */}
          {/* <CheckedProduct cartItems={cartItems} /> */}
          {/* </div> */}
          <Button_Wrapper_100 className="grid2">
            <Button btnTxt="주문하기" onClick={goToOrder} />

            <Button onClick={onClose} btnTxt="닫기"></Button>
          </Button_Wrapper_100>
        </ReactModal>
      </Modal_Wrapper>
    </Container_Modal>
  );
};

export default CartModal;
