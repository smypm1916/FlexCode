import React from "react";
import ReactModal from "react-modal";
import {
  Button_Wrapper_100
} from "../../style/Common_Style";
import { Title } from "../../style/Product_Detail_Style";
import Button from "./Button";
ReactModal.setAppElement("#root");

const CartModal = ({ isOpen, onClose, goToOrder }) => {
  if (!isOpen) return null;

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      style={{
        overlay: {
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // 배경색
          zIndex: 300,
        },
        content: {
          width: "40%",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          position: "static", // static으로 변경
          background: "white",
          padding: "20px",
          borderRadius: "0",
          border: "none",
          padding: "50px",
        },
      }}
    >
      <Title>Added into Cart</Title>

      {/* 장바구니 상품 리스트 */}
      {/* <div> */}
      {/* <CheckedProduct cartItems={cartItems} /> */}
      {/* </div> */}
      <Button_Wrapper_100 className="grid2">
        <Button btnTxt="Order" onClick={goToOrder} />

        <Button onClick={onClose} btnTxt="Close"></Button>
      </Button_Wrapper_100>
    </ReactModal>
  );
};

export default CartModal;
