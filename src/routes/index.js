import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import Authenticated from '../views/Authenticated';
import HouseholdSelect from '../views/HouseholdSelect';
import ListSelect from '../views/ListSelect';
import Settings from '../views/Settings';
import List from '../views/List';
import Bulletin from '../views/Bulletin';
import Pets from '../views/Pets';

export default function Routes({ setHHID }) {
  return (
    <Switch>
      <Route exact path="/" component={Authenticated} />
      <Route exact path="/household" component={() => <HouseholdSelect setHHID={setHHID} />} />

      <Route exact path="/select" component={ListSelect} />
      <Route
        exact
        path={['/todo', '/grocery', '/shopping', '/maintenance', '/cleaning', '/custom/:id']}
        component={List}
      />
      <Route exact path="/bulletin" component={Bulletin} />
      <Route exact path="/pets" component={Pets} />
      <Route exact path="/settings" component={() => <Settings setHHID={setHHID} />} />
    </Switch>
  );
}

Routes.propTypes = {
  setHHID: PropTypes.func.isRequired,
};
