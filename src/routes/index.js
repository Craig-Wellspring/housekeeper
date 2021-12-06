import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Authenticated from '../views/Authenticated';
import HouseholdSelect from '../views/HouseholdSelect';
import ListSelect from '../views/ListSelect';
import Settings from '../views/Settings';
import ToDo from '../views/ToDo';
import Grocery from '../views/Grocery';
import Shopping from '../views/Shopping';
import Maintenance from '../views/Maintenance';
import Cleaning from '../views/Cleaning';
import Bulletin from '../views/Bulletin';
import Pets from '../views/Pets';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Authenticated} />
      <Route exact path="/household" component={HouseholdSelect} />
      <Route exact path="/select" component={ListSelect} />
      <Route exact path="/settings" component={Settings} />
      <Route exact path="/todo" component={ToDo} />
      <Route exact path="/grocery" component={Grocery} />
      <Route exact path="/shopping" component={Shopping} />
      <Route exact path="/maintenance" component={Maintenance} />
      <Route exact path="/cleaning" component={Cleaning} />
      <Route exact path="/bulletin" component={Bulletin} />
      <Route exact path="/pets" component={Pets} />
    </Switch>
  );
}
