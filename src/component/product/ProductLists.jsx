import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Container_Style, Title } from "../../style/Common_Style";
import {
  ProductList_ItemBox,
  ProductList_Wrapper,
} from "../../style/ProductLists_Style";

// MD's PICK 컨테이너
const Container05 = styled.div`
  width: 100%;
  max-width: 60%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

const ProductLists = () => {
  // const [page, setPage] = useState(1);
  // 현재 페이지
  const [products, setProducts] = useState([]); // 상품 목록
  // const [loading, setLoading] = useState(false); 
  // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태
  const navigate = useNavigate();
  const imgPath = import.meta.env.VITE_IMG_PATH;

  // 상품 목록 조회
  // const fetchProducts = async () => {
  //   try {
  //     const res = await axios.get("/api/products/");
  //     console.log("api res: ", res.data);
  //     setProducts(res.data.data);
  // setProducts(Array.isArray(res.data) ? res.data : res.data.data);
  //   } catch (error) {
  //     console.log(error);
  //     setError(error);
  //   }
  // };
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/products/lists", {
        headers: {
          Accept: "application/json",
        },
      });
      console.log("API 응답:", res.data);
      setProducts(res.data);
    } catch (error) {
      console.log('fetchProductError', error);
      setError(error);
    }
  };

  // 스크롤 설정
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Container_Style>
      <Title>SHOPPING</Title>
      {/* 상품 목록 렌더링 */}
      {products.map((product) => (
        <ProductList_Wrapper
          key={product.product_no}
          onClick={() => navigate(`/product/${product.product_no}`)}>
          <ProductList_ItemBox>
            <img
              src={`${imgPath}/${product.product_img}`}
              alt={product.product_name} />
            <div>
              <h3>{product.product_name}</h3>
              <p>{product.product_type}</p>
              <p>{product.product_price} 원</p>
            </div>
          </ProductList_ItemBox>
        </ProductList_Wrapper>
      ))}
    </Container_Style>
  );
};

export default ProductLists;
