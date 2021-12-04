import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { currentUser } from '../api/auth';
import { getHousemate } from '../api/data/housemates-data';

export default function Authenticated() {
  const history = useHistory();

  const validateHousehold = async () => {
    const housemate = await getHousemate(currentUser().id);
    if (housemate) {
      if (housemate.hh_id !== null) {
        history.push('/select');
      } else {
        history.push('/household');
      }
    } else {
      // create Housemate in db
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
