import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Wrapper } from "../../style/Common_Style";
import { Container_Banner } from "../../style/EventBanner_Style";
import Searchbox from "../common/Searchbox";
import Category from "./Category";
import EventBanner from "./EventBanner";
import Pick from "./Pick";
import ProductLists from "./ProductLists";

const Index = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const fetchProducts = useCallback(
    async (reset = false) => {
      if (loading || (!hasMore && !reset)) return;

      setLoading(true);
      const currentPage = reset ? 1 : page;
      const params = {
        page: currentPage,
        limit: 9,
        keyword: searchKeyword,
        category: selectedCategory,
      };

      try {
        const res = await axios.get(
          "http://localhost:8080/api/products/lists",
          { params }
        );

        if (res.data && res.data.success) {
          let newProducts = res.data.data || [];

          // 이미지 파싱 로직 추가
          newProducts = newProducts.map((product) => {
            if (product.PRODUCT_IMG && typeof product.PRODUCT_IMG === "string") {
              const images = product.PRODUCT_IMG.split("$").map((img) => img.trim()).filter(Boolean);
              return {
                ...product,
                PRODUCT_IMG: images[0] || "", // 첫 번째 이미지 또는 빈 문자열
                PRODUCT_IMG_LIST: images,     // 전체 리스트도 필요하면 추가
              };
            }
            return {
              ...product,
              PRODUCT_IMG: "",
              PRODUCT_IMG_LIST: [],
            };
          });

          setProducts((prev) =>
            reset ? newProducts : [...prev, ...newProducts]
          );
          setHasMore(newProducts.length === 9);
          setPage(currentPage + 1);
        }
      } catch (error) {
        console.error("상품 불러오기 오류", error);
      } finally {
        setLoading(false);
      }
    },
    [page, loading, searchKeyword, selectedCategory, hasMore]
  );

  // const fetchProducts = useCallback(
  //   async (reset = false) => {
  //     if (loading || (!hasMore && !reset)) return;

  //     setLoading(true);
  //     const currentPage = reset ? 1 : page;
  //     const params = {
  //       page: currentPage,
  //       limit: 9,
  //       keyword: searchKeyword,
  //       category: selectedCategory,
  //     };

  //     try {
  //       const res = await axios.get(
  //         "http://localhost:8080/api/products/lists",
  //         { params }
  //       );
  //       if (res.data && res.data.success) {
  //         const newProducts = res.data.data || [];
  //         setProducts((prev) =>
  //           reset ? newProducts : [...prev, ...newProducts]
  //         );
  //         setHasMore(newProducts.length === 9);
  //         setPage(currentPage + 1);
  //       }
  //     } catch (error) {
  //       console.error("상품 불러오기 오류", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   },
  //   [page, loading, searchKeyword, selectedCategory, hasMore]
  // );

  // 검색 초기화
  const handleResetSearch = () => {
    setSearchKeyword(""); // 검색어 초기화
    setSelectedCategory(""); // 카테고리도 초기화할지 선택
    setPage(1); // 페이지 초기화
    setHasMore(true); // 다시 무한 스크롤 활성화
    setProducts([]); // 기존 리스트 제거

    // 상태 변경 후 useEffect가 fetchProducts(true) 호출
  };

  // 최초 로딩 시 상품 데이터 불러오기
  useEffect(() => {
    fetchProducts(true);
  }, [searchKeyword, selectedCategory]);

  return (
    <Wrapper className="wrap" id="home">
      {/* <Header /> */}
      <Container_Banner>
        <EventBanner />
      </Container_Banner>
      <Pick />
      <Searchbox
        onSearch={(keyword) => {
          setSelectedCategory(""); // 검색하면 카테고리 초기화
          setSearchKeyword(keyword);
        }}
        onReset={handleResetSearch}
      />
      <Category
        onSelectCategory={(category) => {
          setSearchKeyword(""); // 카테고리 선택하면 검색 초기화
          setSelectedCategory(category);
        }}
      />
      <ProductLists
        products={products}
        loading={loading}
        fetchMore={fetchProducts}
        hasMore={hasMore}
      />
    </Wrapper>
  );
};

export default Index;
