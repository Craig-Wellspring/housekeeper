import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import SignOutButton from '../buttons/SignOutButton';
import SettingsButton from '../buttons/SettingsButton';
import ListViewButton from '../buttons/ListViewButton';
// import { supabase } from '../../api/auth';

const NavBar = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  max-width: 400px;
  justify-content: space-between;

  padding: 6px;
`;

export default function Navigation({ HHID }) {
  // const test = async () => {
  //   const subs = supabase.getSubscriptions();
  //   const aSubs = subs.filter((sub) => sub.isJoined());
  //   aSubs.forEach((sub) => console.warn(sub.topic));
  // };

  return (
    <NavBar>
      {/* <button type="button" className="btn btn-warning" onClick={test}>X</button> */}
      {HHID ? (
        <>
          <SettingsButton />
          <ListViewButton />
        </>
      ) : (
        <div />
      )}
      <SignOutButton />
      {!HHID && <div />}
    </NavBar>
  );
}

Navigation.propTypes = {
  HHID: PropTypes.number,
};

Navigation.defaultProps = {
  HHID: null,
};
