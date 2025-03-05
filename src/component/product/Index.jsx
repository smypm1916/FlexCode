import React from "react";
import { useNavigate } from "react-router-dom";
import Searchbox from "../common/Searchbox";
import Category from "./Category";
import EventBanner from "./EventBanner";
import Pick from "./Pick";

// 상품 상태 관리
// const [products, setProducts] = useState([

// ]);

const Index = () => {
  const navigate = useNavigate();
  return (
    <>
      <EventBanner />
      <Searchbox />
      <Category />
      <Pick />
      <h1>productListsWIP</h1>
      {/* <ProductLists /> */}
    </>
  );
};

export default Index;
