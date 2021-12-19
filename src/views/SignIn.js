import React from 'react';
import SignInButton from '../components/buttons/SignInButton';
import { Panel, PanelTitle } from '../components/StyledComponents';

export default function SignIn() {
  return (
    <Panel>
      <PanelTitle>Housekeeper</PanelTitle>
      <SignInButton />
    </Panel>
  );
}
