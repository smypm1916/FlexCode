import React from "react";
import styled from "styled-components";

// 상품 정보 컨테이너
export const Container01 = styled.div`
  width: 100%;
  height: fit-content;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

// 상품 상세 설명 이미지 컨테이너
export const Container02 = styled.div`
  width: 100%;
  height: fit-content;
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
`;
// 상품 상세 설명 이미지 컨테이너
export const Container03 = styled.div`
  width: 100%;
  height: fit-content;
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
`;

//container01 상품 설명정보 div
export const Product_Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;

//container01 상품 정보 이미지 div
export const Image_Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  img {
    width: 100%;
  }
`;
//container01 상품 정보 텍스트 컨테이너
export const Text_wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

//container01 상품 정보 텍스트
export const Text = styled.h2`
  width: fit-content;
  font-size: 15pt;
  color: black;
  font-weight: 300;
`;

//container01 상품 정보 제목
export const Title = styled.h2`
  text-align: left;
  color: black;
  margin: 0;
  letter-spacing: 2px;
  font-size: 15pt;
`;

//container01 상품 정보 상품명
export const Product_Title = styled.h1`
  text-align: left;
  color: black;
  margin: 0;
  letter-spacing: 2px;
  font-size: 30pt;
`;

//container01 상품 정보 텍스트 박스
export const Text_box = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

//container01 상품 정보 텍스트 박스 제목
export const Button_Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

export const Divide_Box = styled.div`
  width: -webkit-fill-available;
  background-color: #bb9393;
  padding: 20px;
`;

export const Info_Wrapper = styled.div`
  width: -webkit-fill-available;
  display: flex;
  flex-direction: column;
  background-color: white;
`;

export const Info_Title = styled.div`
  padding: 10px 20px;
  width: -webkit-fill-available;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
`;

export const Info_Text = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px 20px;
  width: fit-content;
  font-size: 12pt;
  color: black;
  font-weight: 300;
  width: -webkit-fill-available;
`;
export const Info_Text_Box = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr;
  padding: 10px 0;
`;
