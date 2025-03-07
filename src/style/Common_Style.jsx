import React from "react";
import styled from "styled-components";

export const Title = styled.h2`
  width: 80%;
  text-align: left;
  color: black;
  margin: 0;
  letter-spacing: 2px;
`;

export const Container_Style = styled.div`
  max-width: 100%;
  width: 60%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-itmes: center;
`;

export const Button_Style = styled.button`
  padding: 10px;
  border: 1px solid black;
  transition: all 0.5s;
  color: black;
  background-color: white;
  text-decoration: none;
  font-size: 12pt;
  &:hover {
    background-color: black;
    color: white;
    text-decoration: none;
  }
`;

// select의 style
export const Select_Style = styled.select`
  width: 100%;
  height: 45px;
  font-size: 12pt;
  padding: 10px;
  background-color: white;
  color: black;
  border: 1px solid black;

  &.optionList {
    border-radius: 0;
  }
`;

// input의 style
export const Input_Style = styled.input`
  width: -webkit-fill-available;
  height: 100%;
  font-size: 12pt;
  color: black;
  background: white;
  border: none;

  &:focus {
    outline: none;
  }

  &::file-selector-button {
    font-size: 12pt;
    border: 1px solid black;
    color: black;
    background-color: white;
    transition: all 0.5s;
  }

  &::file-selector-button:hover {
    background-color: black;
    color: white;
  }
`;
