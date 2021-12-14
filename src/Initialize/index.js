import React, { useEffect, useState } from 'react';
import { supabase } from '../api/auth';
import { getUserHHID } from '../api/data/housemates-data';
import Navigation from '../components/panels/Navigation';
import Routes from '../routes';
import SignIn from '../views/SignIn';

function Initialize() {
  const [session, setSession] = useState(null);
  const [HHID, setHHID] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((e, _session) => {
      setSession(_session);
    });
  }, []);

  useEffect(async () => {
    if (session) {
      const id = await getUserHHID();
      setHHID(id);
    }
  }, [session]);

  return (
    <div className="App">
      {session ? (
        <>
          <Navigation HHID={HHID} />
          <Routes setHHID={setHHID} />
        </>
      ) : (<SignIn />)}
    </div>
  );
}

export default Initialize;
