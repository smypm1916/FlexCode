import styled from "styled-components";

export const Nickname_Box = styled.div`
  width: -webkit-fill-available;
  display: grid;
  grid-template-columns: 6fr 1fr;
  gap: 20px;
`;

// -------------------------phone--------------------------------

// 전화번호 input을 묶는 div
export const Phone_Input = styled.div`
  display: grid;
  grid-template-columns: 6fr 1fr;
  gap: 20px;
`;

export const Phone_Box = styled.div`
  display: grid;
  grid-template-columns: 2fr 20px 2fr 20px 2fr;
  align-items: center;
  text-align: center;

  label {
    display: flex;
    justify-content: center;
    height: -webkit-fill-available;
    border-bottom: 1px solid black;
    align-items: center;
  }
`;

// -------------------------e-mail--------------------------------

export const Email_Input = styled.div`
  width: -webkit-fill-available;
  display: grid;
  grid-template-columns: 6fr 1fr;
  align-items: center;
  gap: 20px;
`;

export const Email_Box = styled.div`
  display: grid;
  grid-template-columns: 3fr 20px 3fr;
  align-items: center;
  text-align: center;

  label {
    display: flex;
    height: -webkit-fill-available;
    border-bottom: 1px solid black;
    align-items: center;
  }
`;

// -------------------------post--------------------------------

export const Post_Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr 2fr;
  gap: 20px;
`;
