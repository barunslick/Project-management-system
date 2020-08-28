import React, { Fragment } from 'react';

import { Router, Switch } from 'react-router-dom';

import Login from './components/login/Login';
import Header from './components/header/Header';
import Project from './components/project/Project';
import Homepage from './components/homepage/Homepage';
import Register from './components/register/Register';
import Dashboard from './components/dashboard/Dashboard';
import ProjectItem from './components/project/projectItem/projectItem';

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
          <Fragment>
            <PrivateRoute path="*" component={Header} />
            <PrivateRoute
              path={routeUrls.DASHBOARD}
              component={Dashboard}
              exact
            />
            <PrivateRoute path="/register" component={Register} exact />
            <PrivateRoute
              path={routeUrls.ALL_PROJECTS}
              component={Project}
              exact
            />
            <PrivateRoute
              path={routeUrls.SINGLE_PROJECT}
              component={ProjectItem}
              exact
            />
          </Fragment>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
