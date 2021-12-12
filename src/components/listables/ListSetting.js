import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { getListByID, setListHidden } from '../../api/data/lists-data';
import { Checkbox } from '../StyledComponents';

const Container = styled.div`
  display: flex;
  gap: 10px;
  justify-content: left;
`;

export default function ListSetting({ data }) {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    getListByID(data.id).then((list) => setIsChecked(!list.hidden));
  }, []);

  const handleCheck = async () => {
    await setListHidden(data.id, isChecked);
    setIsChecked(!isChecked);
  };

  return (
    <Container>
      <Checkbox
        type="checkbox"
        onChange={handleCheck}
        checked={isChecked}
      />
      <div>{data.name}</div>
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
  }).isRequired,
};
