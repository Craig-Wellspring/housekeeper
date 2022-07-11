import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { setListHidden } from '../../api/data/lists-data';
import { Checkbox } from '../StyledComponents';

const Container = styled.div`
  display: flex;
  gap: 10px;
  justify-content: left;
  align-items: center;
  padding: 10px;
`;

export default function ListSetting({ data }) {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setIsChecked(!data.hidden);
  }, [data]);

  const handleCheck = async () => {
    await setListHidden(data.id, isChecked);
    setIsChecked(!isChecked);
  };

  return (
    <Container className="border-square">
      <Checkbox
        className="btn-check"
        id={`btn-check ${data.id}`}
        autocomplete="off"
        type="checkbox"
        onChange={handleCheck}
        checked={isChecked}
      />
      <label
        className={`button sm-round-btn ${
          isChecked ? 'secondary' : 'primary'
        }-btn`}
        htmlFor={`btn-check ${data.id}`}
      >
        <i className={`fas fa-${isChecked ? 'check' : ''}`} />
      </label>
      <div>{data.name}</div>
      {data.private && <i className="fas fa-lock" />}
    </Container>
  );
}

ListSetting.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    hh_id: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    hidden: PropTypes.bool.isRequired,
    private: PropTypes.bool.isRequired,
  }).isRequired,
};
