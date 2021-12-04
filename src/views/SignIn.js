import React from 'react';
import styled from 'styled-components';
import { signInUser } from '../api/auth';

const Panel = styled.div``;

export default function SignIn() {
  return (
    <Panel className="panel">
      <div className="panel-title">Welcome! Sign In!</div>
      <button type="button" className="btn btn-success" onClick={signInUser}>
        Sign In
      </button>
    </Panel>
  );
}
