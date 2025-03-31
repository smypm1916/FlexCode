import styled from "styled-components";

// 이벤트 배너 컨테이너너
export const Container_Banner = styled.div`
  background: #bb9393;
  width: 100%;
  background: ;
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 400px;
  display: flex;

  &::after {
    filter: blur(10px);
  }
`;

export const Event_Wrapper = styled.div`
  background: url("/src/assets/imgs/Launching_banner.png") no-repeat right;
  background-size: contain;
  width: 63.4%;

  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

// Event 설명 텍스트
export const Text = styled.p`
  width: fit-content;
  font-size: 2.5vmin;
  color: black;
`;

// Event 배너 제목
export const Title = styled.h2`
  width: 100%;
  text-align: left;
  color: white;
  margin: 0;
  letter-spacing: 2px;
  font-size: 7.5vmin;
`;

export const Logo = styled.div`
  width: 60%;
  background: white;
  img {
    padding: 10px;
    margin: 0;
    width: 300px;
  }
`;
