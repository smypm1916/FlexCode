import React from "react";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import Products from "./Products";
import style, { styled } from "styled-components";
import SignUp from "../account/SignUp";

const Wrapper = styled.div`
  display: column;
  width: 100vw;
  align-items: center;
`;

const Index = () => {
  return (
    <>
      <Header />
      <SignUp />
      <Footer />
    </>
  );
};

export default Index;
