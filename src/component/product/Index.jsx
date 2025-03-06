import React from "react";
import Searchbox from "../common/Searchbox";
import EventBanner from "./EventBanner";
import Pick from "./Pick";
import ProductLists from "./ProductLists";
// 상품 상태 관리
// const [products, setProducts] = useState([

// ]);

const Index = () => {
  return (
    <>
      <EventBanner />
      <Searchbox />
      <h1>Category</h1>
      {/* <Category /> */}
      <Pick />
      <ProductLists />
    </>
  );
};

export default Index;
