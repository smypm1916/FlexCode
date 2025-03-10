import React from "react";
import styled from "styled-components";
import { Category_Box, Category_Wrapper } from "../../style/Category_Style";
import { Container_Style, Title } from "../../style/Common_Style";

const Category = () => {
  //  const [category, setCategory] = useState([]);

  //  useEffect(() => {
  //     const fetchCategory = async () => {
  //        const response = await axios.get("/api/products/category");
  //        setCategory(response.data);
  //     }
  //  }, []);
  return (
    <Container_Style>
      <Title>CATEGORY</Title>
      <Category_Wrapper>
        <Category_Box>cat1</Category_Box>
        <Category_Box>cat2</Category_Box>
        <Category_Box>cat3</Category_Box>
        <Category_Box>cat4</Category_Box>
        <Category_Box>cat5</Category_Box>
        <Category_Box>cat6</Category_Box>
      </Category_Wrapper>
    </Container_Style>
  );
};

export default Category;
