import React from "react";
import styled from "styled-components";
import Header from "../common/Header";
import Searchbox from "../common/Searchbox";
import Category from "./Category";
import EventBanner from "./EventBanner";
import Pick from "./Pick";
import ProductLists from "./ProductLists";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 0;
  align-items: center;
  gap: 50px;
`;

const Index = () => {
  return (
    <Wrapper>
      <Header />
      <EventBanner />
      <Searchbox />
      <Category />
      <Pick />
      <ProductLists />
    </Wrapper>
  );
};

export default Index;
