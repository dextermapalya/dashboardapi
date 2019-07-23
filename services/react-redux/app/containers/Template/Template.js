import '@babel/polyfill';

import React from 'react';
import {
  BrowserRouter, Route, Switch, Redirect
} from 'react-router-dom';
import _ from 'lodash';
import PropTypes from 'prop-types';


import privateRoutes from 'routes/privateRoutes';
import publicRoutes from 'routes/publicRoutes';
import sessionRoutes from 'routes/sessionRoutes';

import Login from 'components/Login';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import PublicLayout from './public';
import PrivateLayout from './private';

// import Authenticate from 'containers/auth';
// import ProtectedRoute from 'components/auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'styles/style_th.scss';
import 'styles/custom.scss';
import 'styles/animate.scss';

export default class Template extends React.PureComponent {
  render() {
    const { isLoggedIn, user } = this.props;
    return (
      <BrowserRouter>
        <Switch>
          {_.map(publicRoutes, (route, key) => {
            const { component, path } = route;
            return (
              <Route
                exact
                path={path}
                key={key}
                render={() => (isLoggedIn ? (
                  <Redirect to="/dashboard" />
                ) : (
                  <PublicLayout Component={Login} route={route} user={user} isLoggedIn={isLoggedIn} />
                ))
                }
              />
            );
          })}

          {_.map(privateRoutes, (route, key) => {
            const { component, path } = route;
            return (
              <Route
                exact
                path={path}
                key={key}
                render={ (route) =>
                  isLoggedIn ? (
                  <PrivateLayout Component={component} route={route} user={user} userActions={this.userActions} />
                  ) : (
                  <PublicLayout Component={Login} route={route} user={user}/>
                  )
                }
              />
            );
          })}

          {_.map(sessionRoutes, (route, key) => {
            const { component, path } = route;
            return (
              <Route
                exact
                path={path}
                key={key}
                render={() => (isLoggedIn ? (
                  <Redirect to="/dashboard" />
                ) : (
                  <PublicLayout
                    Component={component}
                    route={route}
                    user={user}
                    isLoggedIn={isLoggedIn}
                  />
                ))
                }
              />
            );
          })}

          <Route Component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

Template.propTypes = {
  isLoggedIn: PropTypes.bool,
  user: PropTypes.object,
  // location: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};
