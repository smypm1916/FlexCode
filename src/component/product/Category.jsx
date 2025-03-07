import React from "react";
import styled from "styled-components";

// 카테고리 컨테이너 제목
const Title = styled.h2`
  width: 100%;
  text-align: left;
  color: black;
  margin: 0;
  letter-spacing: 2px;
`;

// 카테고리 컨테이너
const Container03 = styled.div`
  width: 100%;
  max-width: 60%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

// 카테고리 컨테이너 안에서 카테고리를 감싸는 div
const Category_Wrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 20px;
`;

// 카테고리 컨텐츠 박스
const Category_Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
  transition: all 0.5s;
  border: 1px solid rgba(0, 0, 0, 0.1);
  &:hover {
    border: none;
    box-shadow: 0 0 20px 10px rgba(0, 0, 0, 0.1);
  }
`;

const Category = () => {
   const [category, setCategory] = useState([]);

   useEffect(() => {
      const fetchCategory = async () => {
         const response = await axios.get("/api/products/category");
         setCategory(response.data);
      }
   }, []);
   return (
      <div>
      <Container03>
      <Title>CATEGORY</Title>
      <Category_Wrapper>
        <Category_Box>cat1</Category_Box>
        <Category_Box>cat2</Category_Box>
        <Category_Box>cat3</Category_Box>
        <Category_Box>cat4</Category_Box>
        <Category_Box>cat5</Category_Box>
        <Category_Box>cat6</Category_Box>
      </Category_Wrapper>
    </Container03>
         </div>
   )
}

export default Category;
