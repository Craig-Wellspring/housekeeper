import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Authenticated from '../views/Authenticated';
import HouseholdSelect from '../views/HouseholdSelect';
import ListSelect from '../views/ListSelect';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Authenticated} />
      <Route exact path="/household" component={HouseholdSelect} />
      <Route exact path="/select" component={ListSelect} />
    </Switch>
  );
}
