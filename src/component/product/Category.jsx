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
    // try {
    //   const res = await axios.get("/api/products/cat", {
    //     headers: { Accept: "application/json" },
    //   });
    //   console.log(res.data);
    //   setCategories(res.data.data);
    // } catch (error) {
    //   // console.error('fetch category error', error);
    //   setError(error);
    // }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // 상단 이미지, 하단 카테고리명 2단구성
  return (
    <Container_Style>
      <Title>CATEGORY</Title>
      <Category_Wrapper>
        {categories.map((category, i) => (
          <Category_Box key={i}>
            {/* <img
              src={`${imgPath}/${product.PRODUCT_IMG}`}
            /> */}
            {category.PRODUCT_TYPE}
          </Category_Box>
        ))}
        <Category_Box>Hat</Category_Box>
        <Category_Box>Top</Category_Box>
        <Category_Box>Pants</Category_Box>
        <Category_Box>Shoes</Category_Box>
        <Category_Box>Accessories</Category_Box>
      </Category_Wrapper>
    </Container_Style>
  );
};

export default Category;
