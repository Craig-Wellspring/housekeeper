import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SignOutButton from '../buttons/SignOutButton';
import SettingsButton from '../buttons/SettingsButton';
import ListViewButton from '../buttons/ListViewButton';
import { getUserHHID } from '../../api/data/housemates-data';
import { supabase } from '../../api/auth';

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
    const hhid = await getUserHHID();
    const { data } = await supabase.from('lists').select('id').eq('hh_id', hhid);
    const listIDArray = data.map((list) => list.id);
    const items = await supabase.from('items').select('id').in('list_id', listIDArray);
    console.warn(items.data);
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
