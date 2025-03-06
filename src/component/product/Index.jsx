import React from "react";
import Searchbox from "../common/Searchbox";
import Category from "./Category";
import EventBanner from "./EventBanner";
import Pick from "./Pick";
import Footer from "../common/Footer";
import Header from "../common/Header";
import styled from "styled-components";
import SignUp from "../account/SignUp";
import ProductDetail from "./ProductDetail";
import CmMain from "../community/CmMain";

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

      {/* <CmMain /> */}
    </Wrapper>
  );
};

export default Index;
