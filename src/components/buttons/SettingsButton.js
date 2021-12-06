import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const Button = styled.button``;

export default function SettingsButton() {
  const history = useHistory();
  return (
    <Button className="btn btn-secondary" onClick={() => history.push('/settings')}>
      <i className="fas fa-cog" />
    </Button>
  );
}
