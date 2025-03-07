import React from "react";
import styled from "styled-components";
import Searchbox from "../common/Searchbox";
import EventBanner from "./EventBanner";
import Pick from "./Pick";
import Footer from "../common/Footer";
import Header from "../common/Header";
import SignUp from "../account/SignUp";
import ProductDetail from "./ProductDetail";
import CmMain from "../community/CmMain";
import Category from "./Category";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 0;
  align-items: center;
  gap: 50px;
`;

import ProductLists from "./ProductLists";
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
      <ProductLists />

      {/* <SignUp /> */}
      {/* <CmMain /> */}
    </Wrapper>
  );
};

export default Index;
