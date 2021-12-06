import React from 'react';
import styled from 'styled-components';
import SignOutButton from '../buttons/SignOutButton';
import SettingsButton from '../buttons/SettingsButton';

const NavBar = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  justify-content: right;

  padding: 10px;
`;

export default function Navigation() {
  return (
    <NavBar>
      <SettingsButton />
      <SignOutButton />
    </NavBar>
  );
}
