import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import listIcons from '../../JSON/listIcons.json';
import { Icon } from '../StyledComponents';

function CustomListIcon({ cList }) {
  const history = useHistory();

  const handleClick = () => {
    history.push(`/custom/${cList.id}`);
  };

  return (
    <>
      {!cList.hidden && (
      <Icon onClick={handleClick}>
        <i style={{ fontSize: '2em' }} className={`fas fa-${listIcons.custom}`} />
        {cList.name}
      </Icon>
      )}
    </>
  );
}

CustomListIcon.propTypes = {
  cList: PropTypes.shape({
    id: PropTypes.number.isRequired,
    hh_id: PropTypes.number.isRequired,
    hm_id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    private: PropTypes.bool.isRequired,
    hidden: PropTypes.bool.isRequired,
  }).isRequired,
};

export default CustomListIcon;
