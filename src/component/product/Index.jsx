import React from "react";
import Header from "../common/Header";
import Searchbox from "../common/Searchbox";
import Category from "./Category";
import EventBanner from "./EventBanner";
import Pick from "./Pick";
import ProductLists from "./ProductLists";

import { Wrapper } from "../../style/Common_Style";

const Index = () => {
  return (
    <Wrapper className="wrap" id="home">
      <Header />
      <EventBanner />
      <Pick />
      <Category />
      <Searchbox />
      <ProductLists />
    </Wrapper>
  );
};

export default Index;
