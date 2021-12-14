import React from 'react';
import PropTypes from 'prop-types';
// import { useHistory } from 'react-router-dom';
import { ButtonContainer } from '../StyledComponents';
import { promoteHousemate } from '../../api/data/housemates-data';

export default function Housemate({ hm }) {
  // const history = useHistory();

  const promoteHM = () => {
    promoteHousemate(hm.id);
    // history.go(0);
  };

  const removeHM = () => {
    console.warn('remove', hm.id);
  };

  return (
    <ButtonContainer>
      {hm.name}
      <button
        type="button"
        className="btn btn-sm btn-primary"
        onClick={promoteHM}
      >
        <i className="fas fa-crown" />
      </button>
      <button
        type="button"
        className="btn btn-sm btn-danger"
        onClick={removeHM}
      >
        <i className="fas fa-ban" />
      </button>
    </ButtonContainer>
  );
}

Housemate.propTypes = {
  hm: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }).isRequired,
};
