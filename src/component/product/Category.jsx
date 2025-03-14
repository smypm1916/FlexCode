import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Category_Box, Category_Wrapper } from "../../style/Category_Style";
import { Container_Style, Title } from "../../style/Common_Style";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const imgPath = import.meta.env.VITE_IMG_PATH;

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/products/cat`, { headers: { Accept: "application/json" } });
      console.log(res.data);
      if (res.data && res.data.success) {
        const newCategories = res.data.data || [];
        // setCategories((prev) => [...prev, ...newCategories]);
        setCategories(res.data.data || []);
      }
    } catch (error) {
      console.error('fetch category error', error);
      setError(error);
    }
  };

  // 최초 마운트시 렌더링
  useEffect(() => {
    fetchCategories();
  }, []);

  // 상태 업데이트 후 확인
  useEffect(() => {
    console.log("Updated Categories:", categories);
  }, [categories]);


  // 상단 이미지, 하단 카테고리명 2단구성
  return (
    <Container_Style>
      <Title>CATEGORY</Title>
      <Category_Wrapper>
        {categories.length > 0 ? (
          categories.map((category, i) => (
            <Category_Box key={i}>
              {/* <img
              src={`${imgPath}/${product.PRODUCT_IMG}`}
            /> */}
              {category.PRODUCT_TYPE}
            </Category_Box>
          ))) : (<p>카테고리 없음</p>)
        }
      </Category_Wrapper>
    </Container_Style>
  );
};

export default Category;
