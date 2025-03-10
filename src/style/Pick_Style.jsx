import styled from "styled-components";

// 컨테이너 안에서 MD's PICK을 감싸는 div
export const Pick_Wrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`;

// MD's PICK 컨텐츠츠 박스
export const Pick_Box = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: white;
  transition: all 0.5s;
  color: black;
  &:hover {
    color: white;
    background-color: #bb9393;
    box-shadow: 0 0 20px 10px rgba(0, 0, 0, 0.1);
  }
`;
// MD's PICK 상품품 이미지
export const Pick_img = styled.div`
  width: 100%;
  height: 200px;
  background-color: #d9d9d9;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  img {
    width: 100%;
  }
`;
// MD's PICK 상품 설명 div
export const Pick_Text = styled.div`
  di; flex;
  flex-direction: column;
  gap: 10px;
  font-size: 15pt; 
  padding: 20px;
  gap: 15px;
  
`;
// MD's PICK 상품 설명 텍스트
export const Text = styled.p`
  width: fit-content;
`;
