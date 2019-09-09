import React, { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';

import { Router, Route, Switch, Redirect } from 'react-router-dom';

import { createBrowserHistory } from 'history';

const SignIn = lazy(() => import('./containers/sign-in.jsx'));
const Apps = lazy(() => import('./containers/Apps.jsx'));
const Users = lazy(() => import('./containers/Users.jsx'));
import Header from './components/Header';
import { Loader } from './components/Loader';

import { tokenService } from './helpers/TokenService';

export const history = createBrowserHistory();

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        tokenService.getToken() ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.object,
  rest: PropTypes.object
};

const HomePageRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        !tokenService.getToken() ? (
          <Component {...props} />
        ) : (
          <Redirect to="/apps" />
        )
      }
    />
  );
};

HomePageRoute.propTypes = {
  component: PropTypes.object,
  rest: PropTypes.object
};

const Routes = () => {
  return (
    <Router history={history}>
      <div>
        <Header />
        <Suspense fallback={<Loader />}>
          <Switch>
            <HomePageRoute exact path="/" component={SignIn} />
            <PrivateRoute exact path="/apps" component={Apps} />
            <PrivateRoute path="/apps/:id" component={Users} />
          </Switch>
        </Suspense>
      </div>
    </Router>
  );
};

export { Routes };
