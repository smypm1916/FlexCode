import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container_Style, Title } from "../../style/Common_Style";
import {
  ProductList_ItemBox,
  ProductList_Wrapper,
  System_message,
} from "../../style/ProductLists_Style";
import { Text_wrapper } from "../../style/ProductLists_Style";

const ProductLists = () => {
  const [page, setPage] = useState(1); // 현재 페이지
  const [products, setProducts] = useState([]); // 상품 목록
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태
  const [hasMore, setHasMore] = useState(true); // 추가 로드 가능 여부
  const navigate = useNavigate();
  const imgPath = import.meta.env.VITE_IMG_PATH;
  const loader = useRef(null); // IntersectionObserver가 감지 요소 ref

  // 페이지 번호를 받아 해당 페이지의 상품들을 불러오는 함수
  const fetchProducts = async (pageToFetch) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:8080/api/products/lists?page=${pageToFetch}&limit=9`,
        { headers: { Accept: "application/json" } }
      );
      console.log("API 응답:", res.data);
      if (res.data && res.data.success) {
        const newProducts = res.data.data || [];
        setProducts((prev) => [...prev, ...newProducts]);
        setHasMore(newProducts.length === 9);
        setPage(pageToFetch); // 현재 페이지 업데이트
      }
    } catch (error) {
      console.log("fetchProductError", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  // 초기 로드시 1페이지 데이터만 불러옴 (마운트 시 한 번 실행)
  useEffect(() => {
    fetchProducts(1);
  }, []);

  // 스크롤이 마지막 요소에 도달하면 다음 페이지 데이터를 불러옴
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !loading) {
        fetchProducts(page + 1);
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
  }, [page, hasMore, loading]);

  return (
    <Wrapper>
      <Container_Style>
        <Title>SHOPPING</Title>
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
              <Text_wrapper>
                <h3>{product.PRODUCT_NAME}</h3>
                <p>{product.PRODUCT_TYPE}</p>
                <p>{product.PRODUCT_PRICE} 원</p>
              </Text_wrapper>
            </ProductList_ItemBox>
          </ProductList_Wrapper>
        ))}
      </Container_Style>
    </Wrapper>
  );
};

export default ProductLists;
