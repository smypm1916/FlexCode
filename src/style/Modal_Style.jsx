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
  font-size: 7.5vmin;
  margin: 0;
  text-align: left;
`;

export const ButtonClose = styled.div`
  padding: 0;
`;

export const Link_box = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  font-size: 12px;
  color: black;
  letter-spacing: 0;

  a {
    width: fit-content;
    cursor: pointer;
  }

  a:hover {
    text-decoration: underline;
  }
`;
