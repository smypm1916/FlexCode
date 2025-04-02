import React from "react";
import { useNavigate } from "react-router-dom";
import { Container_Style, Title } from "../../style/Common_Style";
import {
  Pick_Box,
  Pick_img,
  Pick_Text,
  Pick_Wrapper,
  Text,
} from "../../style/Pick_Style";

// const API_BASE_URL = 'http://localhost:8080/api/products';

const Pick = () => {
  const navigate = useNavigate();

  return (
    <Container_Style>
      <Title>MD'S PICK</Title>
      <Pick_Wrapper>
        <Pick_Box onClick={() => navigate(`/detail/23`)} >
          <Pick_img>
            <img src="src\style\img\blue_hat.png" />
          </Pick_img>
          <Pick_Text>
            <Text>MD's Pick</Text>
            <Text>Vinnie Hat</Text>
            <Text>12,000 ¥ </Text>
          </Pick_Text>
        </Pick_Box>
        <Pick_Box onClick={() => navigate(`/detail/24`)} >
          <Pick_img>
            <img src="src/style/img/shirts.png" />
          </Pick_img>
          <Pick_Text>
            <Text>For All Atmosphere</Text>
            <Text>White Shirts</Text>
            <Text>13,000 ¥ </Text>
          </Pick_Text>
        </Pick_Box>
      </Pick_Wrapper>
    </Container_Style >
  );
};

export default Pick;
