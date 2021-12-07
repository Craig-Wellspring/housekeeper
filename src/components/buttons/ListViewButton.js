import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const Button = styled.button``;

export default function ListViewButton() {
  const history = useHistory();
  return (
    <Button className="btn btn-primary" onClick={() => history.push('/select')}>
      <i className="fas fa-border-all" />
    </Button>
  );
}
