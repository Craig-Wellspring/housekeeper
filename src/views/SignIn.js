import React from 'react';
import SignInButton from '../components/buttons/SignInButton';
import { Panel, PanelTitle } from '../components/StyledComponents';
import logo from '../reference/favicon.ico';

export default function SignIn() {
  return (
    <Panel>
      <img width="64" height="64" alt="Site Logo" src={logo} />
      <PanelTitle>Housekeeper</PanelTitle>
      <SignInButton />
    </Panel>
  );
}
