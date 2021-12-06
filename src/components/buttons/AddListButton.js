import React from 'react';
import styled from 'styled-components';

const Icon = styled.div`
  background-color: gray;
  width: 60px;
  height: 60px;

  padding: 10px;
  border: 1px solid black;
  margin: 10px;
`;

export default function AddListButton() {
  return (
    <Icon>
      +
    </Icon>
  );
}
