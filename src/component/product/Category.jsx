import axios from "axios";
import React, { useEffect, useState } from "react";
import { Category_Box, Category_Wrapper } from "../../style/Category_Style";
import { Container_Style, Title } from "../../style/Common_Style";

const Category = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/products/cat")
      .then(res => setCategories(res.data.data || []))
      .catch(err => console.error(err));
  }, []);

  return (
    <Container_Style>
      <Title>CATEGORY</Title>
      <Category_Wrapper>
        {categories.map((category, i) => (
          <Category_Box key={i} onClick={() => onSelectCategory(category.PRODUCT_TYPE)}>
            {category.PRODUCT_TYPE}
          </Category_Box>
        ))}
      </Category_Wrapper>
    </Container_Style>
  );
};

export default Category;
