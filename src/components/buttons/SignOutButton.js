import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { signOutUser } from '../../api/auth';

export default function SignOutButton() {
  const history = useHistory();

  const signOut = () => {
    signOutUser();
    history.push('/');
  };

  return (
    <button type="button" className="btn btn-danger" onClick={signOut}>
      <i className="fas fa-sign-out-alt" />
    </button>
  );
}
