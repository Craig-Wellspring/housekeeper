import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import listNames from '../../JSON/listNames.json';
import listIcons from '../../JSON/listIcons.json';

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
