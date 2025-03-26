import React from "react";
import { Wrapper } from "../../style/Common_Style";
import styled from "styled-components";

const TeamTitle = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;
const TeamBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const Team = () => {
  return (
    <Wrapper className="wrap nomargin" id="team">
      <TeamTitle>FINAL PROJECT : </TeamTitle>
      <TeamBox>윤성민</TeamBox>
      <TeamBox>박채은</TeamBox>
      <TeamBox>함유진</TeamBox>
      <TeamBox>이민재</TeamBox>
    </Wrapper>
  );
};

export default Team;
