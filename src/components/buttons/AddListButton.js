import React from 'react';
import styled from 'styled-components';

const Icon = styled.div`
  display: flex;
  background-color: gray;
  width: 60px;
  height: 60px;

  padding: 10px;
  border: 2px solid black;
  margin: 40px;

  align-items: center;
  justify-content: center;
`;

export default function AddListButton() {
  const handleClick = () => {
    console.warn('Add list');
  };

  return (
    <Icon onClick={handleClick}>
      <i style={{ fontSize: '2em' }} className="fas fa-plus" />
    </Icon>
  );
}
