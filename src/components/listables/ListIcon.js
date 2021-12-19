import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import listIcons from '../../JSON/listIcons.json';
import { Icon } from '../StyledComponents';

function ListIcon({ list }) {
  const history = useHistory();

  const handleClick = () => {
    if (list.type === 'custom') {
      history.push(`/${list.type}/${list.id}`);
    } else {
      history.push(`/${list.type}`);
    }
  };

  return (
    <>
      {!list.hidden && (
        <Icon onClick={handleClick}>
          <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
            {list.private && (<i className="fas fa-lock" style={{ position: 'absolute', left: '27px', top: '-6px' }} />)}
            <i style={{ fontSize: '35px' }} className={`fas fa-${listIcons[list.type]}`} />
          </div>
          {list.name}
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
    name: PropTypes.string.isRequired,
    hidden: PropTypes.bool.isRequired,
    private: PropTypes.bool.isRequired,
  }).isRequired,
};

export default ListIcon;
