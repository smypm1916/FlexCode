import styled from "styled-components";

// -------------------User Profile------------------

export const User_Status_Column = styled.div`
  width: -webkit-fill-available;
  width: -moz-available;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: fit-content;
`;

export const User_Status_Row = styled.div`
  width: -webkit-fill-available;
  width: -moz-available;
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;
  height: fit-content;

  &.grid2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    align-items: center;
  }
  &.grid3 {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
    align-items: center;
  }

  &.borderBottom {
    padding: 20px 0;
    border-bottom: 1px solid black;
  }
`;

// --------------------- order ---------------------

export const Order_Status = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid black;
`;

export const Order_Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  &.borderBottom {
    border-bottom: 1px solid black;
    padding-bottom: 20px;
  }

  &.marginTop {
    margin-top: 20px;
  }
  &.marginBottom {
    margin-bottom: 20px;
  }

  &.gap5px {
    gap: 5px;
  }
`;

// ---------------------- post -------------------
export const Wrapper_Post = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 20px;

  &.nonePadding {
    padding: 0;
  }

  &.borderBottom {
    border-bottom: 1px solid black;
  }
`;
