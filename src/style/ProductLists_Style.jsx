import styled from "styled-components";

export const ProductList_Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  height: fit-content;
  gap: 20px;
`;

export const ProductList_ItemBox = styled.div`
  width: -webkit-fill-available;
  width: -moz-available;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(0, 0, 0, 0.1);
  transition: all 0.5s;
  background: white;

  &:hover {
    box-shadow: 0 0 20px 10px rgba(0, 0, 0, 0.1);
    background-color: black;
    color: white;
  }

  img {
    width: 100%;
  }
`;

export const Text_wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 20px;
`;

export const System_message = styled.h2`
  height: -webkit-fill-available;
  height: -moz-available;
  background: black;
  color: #bb9393;
  animation: blink 1s infinite;
  position: relative;

  @keyframes blink {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  p {
    position: absolute;
    top: 20px;
    left: 25px;
  }
`;
