import styled from "styled-components";

export const Profile_Img = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  background-color: #d9d9d9;
  overflow: hidden;

  img {
    width: -webkit-fill-available;
    width: -moz-available;
  }

  &.mypageProfile {
    width: 100px;
    height: 100px;
  }
`;

export const List_Column = styled.div`
  width: -webkit-fill-available;
  width: -moz-available;
  display: grid;
  grid-template-columns: 1fr 3fr 2fr 2fr;
  align-items: center;
  background: rgba(255, 255, 255, 0.5);
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1);
  &.statusBox {
    padding: 10px;
  }
`;

export const List_Profile = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;
`;

export const List_Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  img {
    width: 100px;
    height: 100px;
    background-color: #d9d9d9;
  }
`;
