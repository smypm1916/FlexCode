import styled from "styled-components";

export const ProductList_Wrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  height: fit-content;
  gap: 20px;
  background-color: white;
`;

export const ProductList_ItemBox = styled.div`
  width: -webkit-fill-available;
  display: flex;
  flex-direction: column;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
  transition: all 0.5s;

  &:hover {
    box-shadow: 0 0 20px 10px rgba(0, 0, 0, 0.1);
    background-color: black;
    color: white;
  }

  img {
    width: 100%;
    height: 300px;
  }
`;

export const Text_wrapper = styled.div`
  width: -webkit-fill-available;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 20px;
`;

export const System_message = styled.h2`
  width: 100%;
  background: black;
  color: #bb9393;
  text-align: center;
`;
