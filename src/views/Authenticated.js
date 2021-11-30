import React from 'react';
import { signOutUser } from '../api/auth';

export default function Authenticated() {
  return (
    <div className="text-center mt-5">
      <h1>Welcome!</h1>
      <div className="mt-2">
        <button type="button" className="btn btn-danger" onClick={signOutUser}>
          Sign Out
        </button>
      </div>
    </div>
  );
}
