import React from "react";
import styled from "styled-components";
import {
  Container_Banner,
  Event_Wrapper,
  Logo,
  Title,
  Text,
} from "../../style/EventBanner_Style";

const EventBanner = () => {
  return (
    <Event_Wrapper>
      <Logo>
        <img src="/src/assets/imgs/logo.png"></img>
      </Logo>
      <Title>Brand New Launch</Title>
      <Text>We got a GENDERLESS</Text>
    </Event_Wrapper>
  );
};

export default EventBanner;
