import React from 'react';
import styled from 'styled-components';
import SignInButton from '../components/buttons/SignInButton';

const Panel = styled.div``;

export default function SignIn() {
  return (
    <Panel className="panel">
      <div className="panel-title">Welcome! Sign In!</div>
      <SignInButton />
    </Panel>
  );
}
