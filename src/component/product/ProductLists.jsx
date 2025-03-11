import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container_Style, Title } from "../../style/Common_Style";
import {
  ProductList_ItemBox,
  ProductList_Wrapper,
} from "../../style/ProductLists_Style";

const ProductLists = () => {
  const [page, setPage] = useState(1); // 현재 페이지
  const [products, setProducts] = useState([]); // 상품 목록
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태
  const [hasMore, setHasMore] = useState(true); // 추가 로드 가능 여부
  const navigate = useNavigate();
  const imgPath = import.meta.env.VITE_IMG_PATH;
  const loader = useRef(null); // IntersectionObserver가 감지 요소 ref

  // 상품 목록 조회
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:8080/api/products/lists?page=${page}&limit=9`,
        { headers: { Accept: "application/json" } }
      );
      console.log("API 응답:", res.data);
      if (res.data && res.data.success) {
        // res.data.data가 undefined이면 빈 배열을 사용
        const newProducts = res.data.data || [];
        setProducts((prev) => [...prev, ...newProducts]);
        // 새로 불러온 상품 개수가 9개면 다음 페이지 로드 가능
        setHasMore(newProducts.length === 9);
      }
    } catch (error) {
      console.log("fetchProductError", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  // 페이지 번호 변경 시 상품 로드
  useEffect(() => {
    fetchProducts();
  }, [page]);

  // 스크롤이 마지막 요소에 도달 시 다음 페이지 로드
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !loading) {
        setPage((prev) => prev + 1);
      }
    }, options);

    const currentLoader = loader.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }
    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [hasMore, loading]);

  return (
    <Container_Style>
      <Title>SHOPPING</Title>
      {/* 상품 목록 렌더링 */}
      {products.map((product) => (
        <ProductList_Wrapper
          key={product.PRODUCT_NO}
          onClick={() => navigate(`/product/${product.PRODUCT_NO}`)}
        >
          <ProductList_ItemBox>
            <img
              src={`${imgPath}/${product.PRODUCT_IMG}`}
              alt={product.PRODUCT_NAME}
            />
            <div>
              <h3>{product.PRODUCT_NAME}</h3>
              <p>{product.PRODUCT_TYPE}</p>
              <p>{product.PRODUCT_PRICE} 원</p>
            </div>
          </ProductList_ItemBox>
        </ProductList_Wrapper>
      ))}
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      <div ref={loader} />
    </Container_Style>
  );
};

export default ProductLists;