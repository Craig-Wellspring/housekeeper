import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { createList, getLists } from '../../api/data/lists-data';

const Icon = styled.div`
  display: flex;
  color: #1e2024;
  background-image: linear-gradient(to right top, #993c73, #9a4e99, #8e65bf, #6e7de2, #0096ff);
  width: 60px;
  height: 60px;

  padding: 10px;
  border-radius: 6px;
  box-shadow: 4px 4px 4px black;
  margin: 40px;

  align-items: center;
  justify-content: center;

  &:active {
    background-image: linear-gradient(to left bottom, #993c73, #9a4e99, #8e65bf, #6e7de2, #0096ff);
    color: #DEF2FF;
  }
`;

export default function AddListButton({ setLists }) {
  const handleClick = async () => {
    await createList();
    const lists = await getLists();
    setLists(lists);
  };

  return (
    <Icon onClick={handleClick}>
      <i style={{ fontSize: '2em' }} className="fas fa-plus" />
    </Icon>
  );
}

AddListButton.propTypes = {
  setLists: PropTypes.func.isRequired,
};
