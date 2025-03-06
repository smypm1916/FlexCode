import React from "react";
import { useNavigate } from "react-router-dom";
import Searchbox from "../common/Searchbox";
import Category from "./Category";
import EventBanner from "./EventBanner";
import Pick from "./Pick";
import Footer from "../common/Footer";
import Header from "../common/Header";
import styled from "styled-components";
import SignUp from "../account/SignUp";
import ProductDetail from "./ProductDetail";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 0;
  align-items: center;
  gap: 50px;
`;

// 상품 상태 관리
// const [products, setProducts] = useState([]);

const Index = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <Header />
      {/* <ProductDetail /> */}
      <EventBanner />
      <Searchbox />
      <Category />
      <Pick />
      <h1>productListsWIP</h1>
      {/* <SignUp /> */}
      <Footer />
    </Wrapper>
  );
};

export default Index;
