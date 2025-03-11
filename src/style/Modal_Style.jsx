import styled from "styled-components";

export const Phone_Box = styled.div`
  display: grid;
  grid-template-columns: 3fr 20px 2fr 20px 2fr;
  text-align: center;

  label {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: -webkit-fill-available;
    border-bottom: 1px solid black;
  }
`;

export const Title = styled.h2`
  font-size: 40pt;
  margin: 0;
  text-align: left;
`;

export const ButtonClose = styled.div`
  padding: 0;
`;
