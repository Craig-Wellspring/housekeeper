import React from 'react';
import styled from 'styled-components';
import SignOutButton from '../buttons/SignOutButton';

const NavBar = styled.div`
  display: flex;
  width: 100%;
  justify-content: right;
`;

export default function Navigation() {
  return (
    <NavBar>
      <SignOutButton />
    </NavBar>
  );
}
