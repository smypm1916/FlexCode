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
  grid-template-columns: 1fr 3fr 1.5fr 1.5fr;
  align-items: center;
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
