import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Authenticated from '../views/Authenticated';
import HouseholdSelect from '../views/HouseholdSelect';
import ListSelect from '../views/ListSelect';
import Settings from '../views/Settings';
import List from '../views/List';
import Bulletin from '../views/Bulletin';
import Pets from '../views/Pets';
import CustomList from '../views/CustomList';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Authenticated} />
      <Route exact path="/household" component={HouseholdSelect} />
      <Route exact path="/select" component={ListSelect} />
      <Route exact path="/settings" component={Settings} />
      <Route
        exact
        path={['/todo', '/grocery', '/shopping', '/maintenance', '/cleaning']}
        component={List}
      />
      <Route exact path="/bulletin" component={Bulletin} />
      <Route exact path="/pets" component={Pets} />
      <Route exact path="/custom/:id" component={CustomList} />
    </Switch>
  );
}
