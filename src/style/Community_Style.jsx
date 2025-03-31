import styled from "styled-components";

//------------------------- CmMain--------------------------------------------------
export const Container01 = styled.h2`
  width: -webkit-fill-available;
  padding: 20px;
  background: url("src/asset/imgs/Launching_banner.png") no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: white;
  text-align: center;
`;

//------------------------- community 하단 페이지네이션 -------------------------------
export const Button_Before = styled.div`
  border: none;
  padding: 5px;
  width: fit-content;
  transition: all 0.5s;
  &:hover {
    text-decoration: none;
    color: #bb9393;
  }

  &::after {
    transition: all 0.5s;
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

export const Button_After = styled.div`
  border: none;
  padding: 5px;
  width: fit-content;
  transition: all 0.5s;

  &:hover {
    text-decoration: none;
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

export const Button_Pagination = styled.div`
  border: none;
  padding: 5px;
  width: fit-content;
  transition: all 0.5s;

  &:hover {
    text-decoration: none;
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

export const Button_Pagination_now = styled.div`
  border: none;
  padding: 5px;
  width: fit-content;
  transition: all 0.5s;

  &:hover {
    text-decoration: none;
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

// --------------------게시글 리스트-------------------------------

export const Pagination_Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
  align-items: center;
`;

export const Pagination_List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  border-bottom: 1px solid black;
`;

export const Search_Box = styled.div`
  height: fit-content;
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 20px;
  align-items: center;
`;

// --------------------채팅 아이콘 이미지-------------------------------

export const Chat_icon = styled.div`
  display: flex;
  border-radius: 100%;
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.1);
  width: 80px;
  height: 80px;
  transition: all 0.5s;
  background-color: white;
  position: fixed;
  right: 10%;
  bottom: 10%;
  padding: 10px;
  &:hover {
    box-shadow: 0 0 20px 10px rgba(0, 0, 0, 0.1);
  }

  img {
    width: 100%;
  }
`;
