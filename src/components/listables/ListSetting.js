import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import listNames from '../../JSON/listNames.json';
import { getListData, setListHidden } from '../../api/data/lists-data';

const Container = styled.div`
  display: flex;
  gap: 10px;
  justify-content: left;
`;

const Checkbox = styled.input`
  height: 25px;
  width: 25px;
`;

export default function ListSetting({ data }) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    getListData(data.type).then((list) => setChecked(!list.hidden));
  }, []);

  const handleCheck = async () => {
    await setListHidden(data.id, checked);
    setChecked(!checked);
  };

  return (
    <Container>
      <Checkbox
        type="checkbox"
        onChange={handleCheck}
        checked={checked}
      />
      <div>{listNames[data.type]}</div>
    </Container>
  );
}

ListSetting.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    hh_id: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    hidden: PropTypes.bool.isRequired,
  }).isRequired,
};
