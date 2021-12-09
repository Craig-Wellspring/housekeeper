import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { createCList, getCustomLists } from '../../api/data/customlists-data';

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

export default function AddListButton({ setCustomLists }) {
  const handleClick = async () => {
    await createCList();
    const lists = await getCustomLists();
    setCustomLists(lists);
  };

  return (
    <Icon onClick={handleClick}>
      <i style={{ fontSize: '2em' }} className="fas fa-plus" />
    </Icon>
  );
}

AddListButton.propTypes = {
  setCustomLists: PropTypes.func.isRequired,
};
