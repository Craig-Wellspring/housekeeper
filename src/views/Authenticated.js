import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { createHousemate, getHousemate } from '../api/data/households-data';

export default function Authenticated() {
  const history = useHistory();

  const validateHousehold = async () => {
    const housemate = await getHousemate();
    if (housemate) {
      if (housemate.hh_id !== null) {
        history.push('/select');
      } else {
        history.push('/household');
      }
    } else {
      createHousemate();
      history.push('/household');
    }
  };

  useEffect(() => {
    validateHousehold();
  }, []);

  return (
    <></>
  );
}
