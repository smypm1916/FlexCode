import React from "react";
import { Container_Style, Title } from "../../style/Common_Style";
import {
  Pick_Box,
  Pick_img,
  Pick_Text,
  Pick_Wrapper,
  Text,
} from "../../style/Pick_Style";

const Pick = () => {
  return (
    <Container_Style>
      <Title>MD'S PICK</Title>
      <Pick_Wrapper>
        <Pick_Box>
          <Pick_img>
            <img src="src\style\img\blue_hat.png" />
          </Pick_img>
          <Pick_Text>
            <Text>MD가 추천하는 핫한 액세서리</Text>
            <Text>블루 올 비니</Text>
            <Text>12,000원</Text>
          </Pick_Text>
        </Pick_Box>
        <Pick_Box>
          <Pick_img>
            <img src="src/style/img/shirts.png" />
          </Pick_img>
          <Pick_Text>
            <Text>무난한 패션의 대명사</Text>
            <Text>화이트 셔츠</Text>
            <Text>13,000원</Text>
          </Pick_Text>
        </Pick_Box>
      </Pick_Wrapper>
    </Container_Style>
  );
};

export default Pick;
