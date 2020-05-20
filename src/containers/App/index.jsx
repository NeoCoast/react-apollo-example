import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Home from 'Containers/Home';
import Login from 'Containers/Login';
import NotFound from 'Containers/NotFound';
import { ROUTES } from 'Data/constants';
import PrivateRoute from 'Components/PrivateRoute';
import PublicRoute from 'Components/PublicRoute';

import './index.scss';

const App = () => (
  <Router>
    <Switch>
      <PrivateRoute exact path={ROUTES.home} component={Home} />
      <PublicRoute exact path={ROUTES.login} component={Login} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);

export default App;
