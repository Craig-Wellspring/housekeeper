import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Icon = styled.div`
  background-color: gray;
  width: 120px;
  height: 120px;

  padding: 10px;
  border: 1px solid black;
  margin: 10px;
`;

const listNames = {
  todo: 'To-Do',
  grocery: 'Groceries',
  shopping: 'Shopping',
  maintenance: 'Maintenance',
  cleaning: 'Cleaning',
  bulletin: 'Bulletin Board',
  pets: 'Pets',
};

function ListIcon({ list }) {
  return (
    <Icon>
      {listNames[list.type]}
    </Icon>
  );
}

ListIcon.propTypes = {
  list: PropTypes.shape().isRequired,
};

export default ListIcon;
