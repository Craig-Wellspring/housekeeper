import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { supabase } from '../api/auth';
import { getHousemate, getUserHHID } from '../api/data/households-data';
import Navigation from '../components/panels/Navigation';
import Routes from '../routes';
import SignIn from '../views/SignIn';

function Initialize() {
  const [session, setSession] = useState(null);
  const [HHID, setHHID] = useState(null);
  const history = useHistory();

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

  const updateHM = async (payload) => {
    if (payload.new.hh_id !== payload.old.hh_id) {
      history.push('/');
      setHHID(null);
    }
  };

  let sub;

  const subscribeToHousehold = async () => {
    const HM = await getHousemate();
    const subscription = supabase
      .from(`housemates:id=eq.${HM.id}`)
      .on('*', updateHM)
      .subscribe();
    return subscription;
  };

  useEffect(async () => {
    if (HHID) {
      subscribeToHousehold();
    } else if (sub) supabase.removeSubscription(sub);
  }, [HHID]);

  return (
    <div className="App">
      {session ? (
        <>
          <Navigation HHID={HHID} />
          <Routes HHID={HHID} setHHID={setHHID} />
        </>
      ) : (
        <SignIn />
      )}
    </div>
  );
}

export default Initialize;
