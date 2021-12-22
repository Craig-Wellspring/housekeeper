import React from 'react';
import SignInButton from '../components/buttons/SignInButton';
import { Panel, PanelTitle } from '../components/StyledComponents';

export default function SignIn() {
  return (
    <Panel>
      <img width="64" height="64" alt="site logo" src="./public/favicon.ico" />
      <PanelTitle>Housekeeper</PanelTitle>
      <SignInButton />
    </Panel>
  );
}
