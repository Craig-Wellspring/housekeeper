import React from 'react';
import { signInUser } from '../../api/auth';

export default function SignInButton() {
  return (
    <button type="button" className="button primary-btn round-btn" onClick={signInUser}>
      <i className="fas fa-sign-in-alt" />
    </button>
  );
}
