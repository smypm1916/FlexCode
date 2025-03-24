import React from "react";
import Header from "../common/Header";
import Category from "./Category";
import EventBanner from "./EventBanner";
import Pick from "./Pick";
import ProductLists from "./ProductLists";

import { Wrapper } from "../../style/Common_Style";
import Searchbox from "../common/Searchbox";

const Index = () => {
  return (
    <Wrapper className="cm" id="home">
      <Header />
      <EventBanner />
      <Pick />
      <Searchbox />
      <Category />
      <ProductLists />
    </Wrapper>
  );
};

export default Index;
