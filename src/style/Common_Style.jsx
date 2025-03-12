import React from "react";
import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  padding: 80px 0;
`;

export const Title = styled.h2`
  width: 80%;
  text-align: left;
  color: black;
  margin: 0;
  letter-spacing: 2px;
`;

// contents 를 묶는 container의 style
export const Container_Style = styled.div`
  max-width: 100%;
  width: 60%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-itmes: center;
  margin: 0 auto;
`;

// -------------------------button--------------------------------

// 버튼의 style
export const Button_Style = styled.button`
  width: -webkit-fill-available;
  height: 45px;
  padding: 10px;
  border: 1px solid black;
  transition: all 0.5s;
  color: black;
  background-color: white;
  text-decoration: none;
  font-size: 12pt;
  &:hover {
    background-color: black;
    color: #bb9393;
    text-decoration: none;
  }
`;

// 버튼을 묶는 div
export const Button_Wrapper_100 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

// -------------------------select--------------------------------

// select의 style
export const Select_Style = styled.select`
  width: -webkit-fill-available;
  height: 45px;
  font-size: 12pt;
  padding: 10px;
  background-color: white;
  color: black;
  border: none;
  border-bottom: 1px solid black;

  &.optionList {
    border-radius: 0;
    color: black;
  }
`;

// -------------------------input--------------------------------

// input의 style
export const Input_Style = styled.input`
  width: -webkit-fill-available;

  font-size: 12pt;
  color: black;
  background: white;
  border: none;

  &:focus {
    outline: none;
  }

  &::file-selector-button {
    font-size: 12pt;
    border: 1px solid black;
    color: black;
    background-color: white;
    transition: all 0.5s;
  }

  &::file-selector-button:hover {
    background-color: black;
    color: white;
  }
`;

export const ThreePartGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

// wrapper로 묶어야할 자식요소가 있는경우 사용
export const Input_Wrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 7fr;
  align-items: center;
  gap: 20px;
`;

export const Container_Modal = styled.div`
  top: 0;
  width: 100vw;
  height: 100vh;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.25); /* 반투명 배경 */
  backdrop-filter: blur(5px); /* 배경 블러 효과 */
  z-index: 1000; /* 다른 요소들 위에 배치 */
  flex-wrap: wrap;
  transition: ;
`;

export const Input_Box = styled.div`
  width: -webkit-fill-available;
  height: -webkit-fill-available;
  border: none;
  border-bottom: 1px solid black;
  padding: 10px;
  text-align: left;
  background: white;
`;

// -------------------------NickName--------------------------------

// ------------------------------------------------

export const Modal_Wrapper = styled.div`
  width: 40%;
  margin: 50px auto;
  background: white;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  color: black;
  letter-spacing: 1px;
  padding: 50px;
  display: flex;
  flex-direction: column;
  gap: 21px;
  flex-wrap: wrap;
`;

export const ButtonClose = styled.div`
  padding: 0;
`;
