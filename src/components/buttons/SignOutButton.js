import React from 'react';
import { signOutUser } from '../../api/auth';

export default function SignOutButton() {
  return (
    <button type="button" className="btn btn-danger" onClick={signOutUser}>
      <i className="fas fa-sign-out-alt" />
    </button>
  );
}
