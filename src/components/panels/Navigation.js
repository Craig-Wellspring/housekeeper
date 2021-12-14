import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import SignOutButton from '../buttons/SignOutButton';
import SettingsButton from '../buttons/SettingsButton';
import ListViewButton from '../buttons/ListViewButton';

const NavBar = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  justify-content: space-between;

  padding: 10px;
`;

export default function Navigation({ HHID }) {
  // const test = async () => {
  //   console.warn(HHID);
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
    </NavBar>
  );
}

Navigation.propTypes = {
  HHID: PropTypes.number,
};

Navigation.defaultProps = {
  HHID: null,
};
