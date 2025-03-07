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
  background: url("src/style/img/launching_banner.png") no-repeat right;
  background-size: contain;
  width: 60%;
  height: 100%;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

// Event 설명 텍스트
export const Text = styled.p`
  width: fit-content;
  font-size: 15pt;
  color: black;
`;

// Event 배너 제목
export const Title = styled.h2`
  width: 100%;
  text-align: left;
  color: white;
  margin: 0;
  letter-spacing: 2px;
  font-size: 40pt;
`;

export const Logo = styled.div`
  width: 53.4%;
  background: white;
  img {
    padding: 10px;
    margin: 0;
    font-size: 20px;
    width: 300px;
  }
`;
