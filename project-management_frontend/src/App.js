import React from 'react';

import { Router, Switch } from 'react-router-dom';

import Login from './components/login/Login';
import Homepage from './components/homepage/Homepage';
import Dashboard from './components/dashboard/Dashboard';

import { history } from './helper/history.js';
import * as routeUrls from './constants/routeUrls';
import PublicRoute from './components/publicRoutes';
import PrivateRoute from './components/privateRoutes';

import './App.scss';

/**
 * Main app wrapper.
 *
 */
function App() {
  return (
    <Router history={history}>
      <div className="MainAppWrapper">
        <Switch>
          <PublicRoute path={routeUrls.BASE} component={Homepage} exact />
          <PublicRoute path={routeUrls.LOGIN} component={Login} exact />
          <PrivateRoute
            path={routeUrls.DASHBOARD}
            component={Dashboard}
            exact
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
