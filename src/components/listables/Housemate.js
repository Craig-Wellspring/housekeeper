import React from 'react';
import PropTypes from 'prop-types';
import { ButtonContainer } from '../StyledComponents';
import {
  promoteHousemate,
  removeHousemate,
} from '../../api/data/households-data';

export default function Housemate({ hm, userHoH }) {
  const promoteHM = async () => {
    await promoteHousemate(hm.id);
  };

  const removeHM = async () => {
    await removeHousemate(hm.id);
  };

  return (
    <ButtonContainer className="border-square" style={{ padding: '10px' }}>
      {userHoH && (
      <button
        type="button"
        className="button primary-btn sm-round-btn"
        onClick={removeHM}
      >
        <i className="fas fa-ban" />
      </button>
      )}
      {hm.name}
      {userHoH && (
      <button
        type="button"
        style={{ fontSize: '60%' }}
        className="button primary-btn sm-round-btn"
        onClick={promoteHM}
      >
        <i className="fas fa-crown" />
      </button>
      )}
    </ButtonContainer>
  );
}

Housemate.propTypes = {
  hm: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }).isRequired,
  userHoH: PropTypes.bool.isRequired,
};
