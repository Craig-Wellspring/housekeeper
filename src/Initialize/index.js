import React, { useEffect, useState } from 'react';
import { supabase } from '../api/auth';
import Routes from '../routes';
import SignIn from '../views/SignIn';

function Initialize() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((e, _session) => {
      setSession(_session);
    });
  }, []);

  return (
    <div className="App">
      {session ? (<Routes />) : (<SignIn />)}
    </div>
  );
}

export default Initialize;
