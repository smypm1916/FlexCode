import styled from "styled-components";

export const ProductList_Wrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  height: 300px;
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
`;

export const Text_wrapper = styled.div`
  width: -webkit-fill-available;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 20px;
`;
