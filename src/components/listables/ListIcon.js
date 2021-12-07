import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const Icon = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-content: center;
  justify-content: center;
  background-color: gray;
  width: 120px;
  height: 120px;

  font-weight: bold;

  padding: 10px;
  border: 2px solid black;
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

const listIcons = {
  todo: 'clipboard-list',
  grocery: 'utensils',
  shopping: 'tag',
  maintenance: 'wrench',
  cleaning: 'broom',
  bulletin: 'thumbtack',
  pets: 'paw',
};

function ListIcon({ list }) {
  const history = useHistory();

  const handleClick = () => {
    history.push(`/${list.type}`);
  };

  return (
    <>
      {!list.hidden && (
      <Icon onClick={handleClick}>
        <i style={{ fontSize: '2em' }} className={`fas fa-${listIcons[list.type]}`} />
        {listNames[list.type]}
      </Icon>
      )}
    </>
  );
}

ListIcon.propTypes = {
  list: PropTypes.shape({
    id: PropTypes.number.isRequired,
    hh_id: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    hidden: PropTypes.bool.isRequired,
  }).isRequired,
};

export default ListIcon;
