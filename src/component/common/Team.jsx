import React from "react";
import { Wrapper } from "../../style/Common_Style";
import styled from "styled-components";

const TeamTitle = styled.div`
  position: relative;
  z-index: 5;
  height: 20%;
  display: flex;
  align-items: center;
  font-size: 10vmin;
  font-weight: bold;

  color: black;
  margin: 0;
  cursor: pointer;
  transition: all 0.5s;
  &:hover {
    color: white;
  }

  &::after {
    position: absolute;
    font-size: 10vmin;
    z-index: 1;
    transition: 0.5s;
    content: "FINAL PROJECT : FlexCode";
    width: 0;
    height: 100%;
    display: block;
    background: #bb9393;
    overflow: hidden;
  }

  &:hover::after {
    color: white;
    width: 100%;
  }
`;
const TeamBox = styled.div`
  position: relative;
  z-index: 5;
  height: 20%;
  display: flex;
  align-items: center;
  font-size: 10vmin;
  font-weight: bold;

  color: black;
  margin: 0;
  cursor: pointer;
  transition: all 0.5s;
  &:hover {
    color: white;
  }

  &::after {
    position: absolute;
    font-size: 10vmin;
    z-index: 1;
    transition: 0.5s;
    width: 0;
    height: 100%;
    display: block;
    background: #bb9393;
    overflow: hidden;
  }
  &#p1::after {
    content: "윤성민";
  }
  &#p2::after {
    content: "박채은";
  }
  &#p3::after {
    content: "함유진";
  }
  &#p4::after {
    content: "이민재 / 역할 : 디자인 총괄, css 전반";
  }
  &:hover::after {
    color: white;
    width: 100%;
  }
`;

const Team = () => {
  return (
    <Wrapper className="wrap nomargin" id="team">
      <TeamTitle>FINAL PROJECT : FlexCode</TeamTitle>
      <TeamBox id="p1">윤성민</TeamBox>
      <TeamBox id="p2">박채은</TeamBox>
      <TeamBox id="p3">함유진</TeamBox>
      <TeamBox id="p4">이민재</TeamBox>
    </Wrapper>
  );
};

export default Team;
