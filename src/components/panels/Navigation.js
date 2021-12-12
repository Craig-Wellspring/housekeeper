import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SignOutButton from '../buttons/SignOutButton';
import SettingsButton from '../buttons/SettingsButton';
import ListViewButton from '../buttons/ListViewButton';
import { getHousemateByID, getUserHHID } from '../../api/data/housemates-data';

const NavBar = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  justify-content: space-between;

  padding: 10px;
`;

export default function Navigation() {
  const [hhID, sethhID] = useState('');

  useEffect(() => {
    getUserHHID().then(sethhID);
  }, []);

  const test = async () => {
    getHousemateByID(4).then(console.warn);
  };

  return (
    <NavBar>
      <SettingsButton />
      <button type="button" className="btn btn-warning" onClick={test}>X</button>
      {hhID && <ListViewButton />}
      <SignOutButton />
    </NavBar>
  );
}
