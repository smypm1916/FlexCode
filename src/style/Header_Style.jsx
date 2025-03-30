import styled from "styled-components";

//상단의 header 전체를 묶는 div
export const Wrapper_Header = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  min-width: 720px;
  width: -webkit-fill-available;
  width: -moz-available;
  height: 100px;
  align-items: center;
  transition: all 0.5s;
  z-index: 100;
  display: grid;
  grid-template-columns: 1fr 8fr 1fr;
  padding: 0 50px;
  gap: 80px;
  border-bottom: 1px solid black;
  background: rgba(255, 255, 255, 0.5);

  &:hover {
    background: white;
  }
`;

// 로고 box
export const Logo = styled.div`
  img {
    margin: 0;
    font-size: 3vmin;
    width: 150px;
  }

  &::after {
    transition: 0.5s;
    content: "";
    width: 0;
    height: 5px;
    display: block;
    background: #bb9393;
  }

  &:hover::after {
    width: 100%;
  }
`;

// 로그인 모달열기 버튼/로그아웃버튼
export const Button_Log = styled.button`
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
`;

// 장바구니 열기 버튼
export const Button_Bucket = styled.button`
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
`;

// 회원가입 바로가기 버튼
export const Button_Register = styled.button`
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
    transition: 0.5s;
    content: "";
    width: 0;
    height: 1px;
    display: block;
    background: black;
  }

  &:hover::after {
    width: 100%;
  }
`;

// 메뉴 text
export const Menu = styled.h4`
  color: black;
  margin: 0;
  cursor: pointer;
  transition: all 0.5s;
  &:hover {
    color: #bb9393;
  }

  &::after {
    transition: 0.5s;
    content: "";
    width: 0;
    height: 2px;
    display: block;
    background: #bb9393;
  }

  &:hover::after {
    width: 100%;
  }
`;

// 메뉴 전체를 감싸는 div
export const Menu_Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;
`;

// 프로필 이미지 감싸는 컨테이너
export const ProfileWrapper = styled.div``;

// 프로필 이미지 스타일
export const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
