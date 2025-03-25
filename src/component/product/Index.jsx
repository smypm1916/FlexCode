import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Wrapper } from "../../style/Common_Style";
import Header from "../common/Header";
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

  const fetchProducts = useCallback(async (reset = false) => {
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
      const res = await axios.get("http://localhost:8080/api/products/lists", { params });
      if (res.data && res.data.success) {
        const newProducts = res.data.data || [];
        setProducts((prev) => (reset ? newProducts : [...prev, ...newProducts]));
        setHasMore(newProducts.length === 9);
        setPage(currentPage + 1);
      }
    } catch (error) {
      console.error("상품 불러오기 오류", error);
    } finally {
      setLoading(false);
    }
  }, [page, loading, searchKeyword, selectedCategory, hasMore]);

  // 최초 로딩 시 상품 데이터 불러오기
  useEffect(() => {
    fetchProducts(true);
  }, [searchKeyword, selectedCategory]);

  return (
    <Wrapper className="wrap" id="home">
      <Header />
      <EventBanner />
      <Pick />
      <Searchbox onSearch={(keyword) => {
        setSearchKeyword(keyword);
        setSelectedCategory(""); // 검색하면 카테고리 초기화
      }} />
      <Category onSelectCategory={(category) => {
        setSelectedCategory(category);
        setSearchKeyword(""); // 카테고리 선택하면 검색 초기화
      }} />
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
