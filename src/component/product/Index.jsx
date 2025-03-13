import React from "react";
import styled from "styled-components";
import Header from "../common/Header";
import Searchbox from "../common/Searchbox";
import Category from "./Category";
import EventBanner from "./EventBanner";
import Pick from "./Pick";
import ProductLists from "./ProductLists";
import CmMain from "../community/CmMain";
import CmAdd from "../community/CmAdd";

import { Wrapper } from "../../style/Common_Style";

const Index = () => {
  return (
    <Wrapper className="cm" id="home">
      {/* <CmAdd /> */}
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
