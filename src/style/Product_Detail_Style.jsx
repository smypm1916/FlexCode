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
  width: -webkit-fill-available;
  width: -moz-available;
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
  display: flex;
  width: fit-content;
  font-size: 2.5vmin;
  color: black;
  font-weight: 300;
  align-items: center;
  gap: 20px;

  &.more {
    display: inline-block;
    color: black;
    cursor: pointer;
    font-size: 2vmin;
    transition: all 0.5s;
    background: none;
    border: none;

    &:hover {
      text-decoration: none;
    }

    &::after {
      transition: 300ms;
      content: "";
      width: 0;
      height: 1px;
      display: block;
      background: black;
    }

    &:hover::after {
      width: 100%;
    }
  }
`;

//container01 상품 정보 제목
export const Title = styled.h2`
  text-align: left;
  color: black;
  margin: 0;
  letter-spacing: 2px;
  font-size: 2.5vmin;
`;

//container01 상품 정보 상품명
export const Product_Title = styled.h1`
  text-align: left;
  color: black;
  margin: 0;
  letter-spacing: 2px;
  font-size: 5vmin;
`;

//container01 상품 정보 텍스트 박스
export const Text_box = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  &.column {
    display: flex;
    flex-direction: column;
    gap: 0;
  }
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
  font-size: 2vmin;
  color: black;
  font-weight: 300;
  width: -webkit-fill-available;
`;
export const Info_Text_Box = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr;
  padding: 10px 0;
`;

export const Container_Bucket = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 10px 0;
  border-bottom: 1px solid black;
`;

export const Bucket_option = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  input {
    border: none;
  }

  input::focus {
    outline: none;
  }

  Button {
    border: none;
  }
`;

export const Bucket_Text = styled.div`
  Text {
    font-size: 1.5vmin;
  }
`;
