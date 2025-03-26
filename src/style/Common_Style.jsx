import React from "react";
import styled from "styled-components";

export const Wrapper = styled.div`
  min-width: 720px;
  width: -webkit-fill-available;
  width: -moz-available;
  min-height: calc(100vh - 100px);
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: Center;
  gap: 50px;
  margin-bottom: 80px;

  //각 page별 Wrapper의 공용 style
  &.wrap::after {
    width: 100%;
    display: inline-block;
    color: rgba(187, 147, 147, 0.15);
    position: fixed;
    top: 0;
    left: -20px;
    margin: 0;
    padding: 0;
    font-size: 50vh;
    font-weight: bold;
    pointer-events: none;
    line-height: 100vh;
    z-index: -1;
  }
  &.nomargin {
    margin: 0;
  }

  &.marginTop {
    margin-top: 50px;
  }

  // index(메인페이지)의 Wrapper 전용 스타일
  &#home::after {
    content: "GENDER_";
    white-space: pre;
  }

  // signup(회원가입)의 Wrapper 전용 스타일
  &#register::after {
    content: "REGISTER";
  }

  // CmAdd(게시물 작성)의 Wrapper 전용 스타일
  &#add::after {
    content: "WRITE";
  }

  // CmMain(커뮤니티 메인페이지)의 Wrapper 전용 스타일
  &#community::after {
    content: "COMMUNITY";
  }

  // CmDetail(게시물 상세페이지)의 전용 스타일
  &#post::after {
    content: "POST";
  }

  &#mypage {
    margin-top: 50px;
  }

  &#mypage::after {
    content: "PROFILE";
  }

  &.mypage {
    margin: 0;
    padding: 0;
    min-height: fit-content;
  }

  &#modiuser {
    margin-top: 50px;
  }
  &#account {
    margin: 0;
    padding: 0;
  }

  &#success::after {
    content: "WELCOME!";
  }

  &#shipping::after {
    content: "SHIPPING";
  }

  &#order::after {
    content: "ORDER";
  }
  // -------------- team --------------
  &#team::after {
    content: "TEAM";
  }
  &#team {
    width: -webkit-fill-available;
    display: grid;
    grid-template-rows: repeat(5, 1fr);
    gap: 0;
  }

  &.mypageCon {
    width: fit-content;
    min-width: 0;
    height: fit-content;
    min-height: fit-content;
    margin: 0;
  }
`;

// 각 Container 별 용도의 Title
export const Title = styled.h2`
  color: black;
  margin: 0;
`;

// contents 를 묶는 container의 style
export const Container_Style = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-itmes: center;
  margin: 0 auto;
  flex-wrap: wrap;

  &.RegComplete {
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 20px 10px rgba(0, 0, 0, 0.1);
  }

  &.Shipping {
    border: 1px solid black;
    padding: 50px;
    width: -webkit-fill-available;
    width: -moz-available;
  }

  &.Bucket {
    width: -webkit-fill-available;
    width: -moz-available;
    border-bottom: 1px solid black;
    padding-bottom: 20px;
  }

  &#Bucket_Module {
    border: none;
  }

  &.wrap {
    box-shadow: 0 0 20px 10px rgba(0, 0, 0, 0.1);
    background: rgba(255, 255, 255, 0.5);
    padding: 50px;
  }
`;

// -------------------------button--------------------------------

// 버튼의 style
export const Button_Style = styled.button`
  width: -webkit-fill-available;
  width: -moz-available;
  height: 45px;
  padding: 10px;
  border: 1px solid black;
  transition: all 0.5s;
  color: black;
  background: none;
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
  width: -webkit-fill-available;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;

  &.grid2 {
    grid-template-columns: 1fr 1fr;
  }
  &.grid1 {
    grid-template-columns: 1fr;
  }
`;

// -------------------------select--------------------------------

// select의 style
export const Select_Style = styled.select`
  width: -webkit-fill-available;
  width: -moz-available;
  height: 45px;
  font-size: 12pt;
  padding: 10px;
  color: black;
  border: none;
  border-bottom: 1px solid black;
  background: none;

  &.optionList {
    border-radius: 0;
    color: black;
  }
`;

// -------------------------input--------------------------------

// input의 style
export const Input_Style = styled.input`
  width: -webkit-fill-available;
  width: -moz-available;
  background: none;
  font-size: 12pt;
  color: black;
  border: none;

  &:focus {
    outline: none;
  }

  &::file-selector-button {
    font-size: 12pt;
    border: 1px solid black;
    color: black;
    background-color: none;
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
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.25); /* 반투명 배경 */
  backdrop-filter: blur(5px); /* 배경 블러 효과 */
  z-index: 500; /* 다른 요소들 위에 배치 */
  flex-wrap: wrap;
  transition: ;

  ReactModal {
    display: flex;
    position: absolute;
    z-index: 600;
    width: fit-content;
    height: fit-content;
  }
`;

export const Input_Box = styled.div`
  width: -webkit-fill-available;
  width: -moz-available;
  height: -webkit-fill-available;
  height: -moz-available;
  border: none;
  border-bottom: 1px solid black;
  padding: 10px;
  text-align: left;
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

export const Post_Modal_Wrapper = styled.div`
  width: fit;
  margin: 50px auto;
  background: white;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  color: black;
  letter-spacing: 1px;
  display: flex;

  flex-direction: column;
  gap: 21px;
  flex-wrap: wrap;
`;

export const ButtonClose = styled.div`
  padding: 0;
`;

// --------------------etc--------------

export const Textarea_Style = styled.textarea`
  max-width: 100%;
  width: 100%;
  border: none;
  height: 200px;
  resize: none;
  font-size: 12pt;
  scrollbar-width: 2px;
  scrollbar-color: #bb9393;
  background: none;
  transition: all 0.5s;
  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    width: 5px;
    background-color: #bb9393;
  }

  &:focus {
    outline: none;
  }
`;

export const BaseAddress = styled.div`
  display: flex;
  align-items: center;
`;

// -------------------- 상품 추가 버튼 및 수량조정버튼 --------------
export const Wrapper_BucketInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
