import styled from "styled-components";

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

export const Pagination_Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
  align-items: center;
`;

export const Pagination_List = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  padding: 20px;
  border-bottom: 1px solid black;
  T
`;
