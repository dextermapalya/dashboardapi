import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import _ from "lodash";
import PropTypes from "prop-types";

import PrivateLayout from "./private";
import PublicLayout from "./public";

import privateRoutes from "routes/privateRoutes";
import publicRoutes from "routes/publicRoutes";
import sessionRoutes from "routes/sessionRoutes";

import Login from "components/Login";
import NotFoundPage from "containers/NotFoundPage/Loadable";

//import Authenticate from 'containers/auth';
//import ProtectedRoute from 'components/auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'styles/style_th.scss';
import 'styles/custom.scss';
import 'styles/animate.scss';

export default class Template extends React.PureComponent {
  constructor(props) {
    super(props);
    //this.userActions = new UserActions(this.props.dispatch);
  }

  /*componentWillMount() {
    this.userActions.verify();
  }*/

  render() {
    const {isLoggedIn, user} = this.props;
    return (
      <BrowserRouter>
        <Switch>
          {_.map(publicRoutes, (route, key) => {
            const { component, path } = route;
            console.log('PUBLIC ROUTES.... ', path)

            return (
              <Route
                exact
                path={path}
                key={key}
                render={route => 
                    isLoggedIn ? (    
                    <Redirect to="/dashboard" />                
                ) : (
                    <PublicLayout Component={Login} route={route} user={user} isLoggedIn={isLoggedIn}/>
                )
              }
              />
            );
          })}

          {_.map(privateRoutes, (route, key) => {
            const { component, path } = route;
            console.log('PRIVATE ROUTES....', path)
            return (
              <Route
                exact
                path={path}
                key={key}
                render={route =>
                    isLoggedIn ? (
                    <PrivateLayout
                      Component={component}
                      route={route}
                      user={user}
                      isLoggedIn={isLoggedIn}
                    />
                  ) : (
                    <PublicLayout Component={Login} route={route} user={user} isLoggedIn={isLoggedIn}/>
                  )
                }
              />
            );
          })}

          {_.map(sessionRoutes, (route, key) => {
            const { component, path } = route;
            console.log('SESSION ROUTES.... ', path)

            return (
              <Route
                exact
                path={path}
                key={key}
                render={route =>
                    isLoggedIn ? (
                    <Redirect to="/dashboard" />
                  ) : (
                    <PublicLayout
                      Component={component}
                      route={route}
                      user={user}
                      isLoggedIn={isLoggedIn}
                    />
                  )
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
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  isLoggedIn: PropTypes.bool,
  user: PropTypes.object,
  //location: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};
