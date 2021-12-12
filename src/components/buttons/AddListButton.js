import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { createList, getLists } from '../../api/data/lists-data';

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
