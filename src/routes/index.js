import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Authenticated from '../views/Authenticated';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Authenticated} />
    </Switch>
  );
}
