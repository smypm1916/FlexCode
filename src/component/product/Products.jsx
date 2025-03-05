import React from "react";
import LoginModal from "../account/LoginModal";
import style, { styled } from "styled-components";

const Contents = styled.div`
  max-width: 1440px;
  width: fit-content;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

const Box_wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(30%, 200px));
  width: 100%;
  gap: 20px;
`;

const Box = styled.div`
  height: 200px;
  background-color: black;
`;

const Products = () => {
  return <Contents>main contents</Contents>;
};

export default Products;
