import PropTypes from 'prop-types';
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Comp, isLoggedIn, path, ...rest }) => {
    console.log('Protected', isLoggedIn)
    console.log('Protected1', path )

  return (
    <Route
      path={path}
      {...rest}
      render={props => {
        return isLoggedIn ? (
          <Comp {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login", // "/login/"
              params:{test:path},
              state: {
                prevLocation: path,
                error:
                  "You are not authorized to view this page, please login first!"
              }
            }}
          />
        );
      }}
    />
  );
};

ProtectedRoute.propTypes = {
  credentials: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  user: PropTypes.object,
  isLoggedIn: PropTypes.bool,
  path: PropTypes.string
};

export default ProtectedRoute;
