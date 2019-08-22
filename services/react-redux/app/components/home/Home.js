

import React, { Component } from 'react';
import Log from 'logger-init';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const Home = ({ user, isLoggedIn }) => {
  /* user object can be accessed in Dashboard component
  via props.route.location.user */
  return (
    <Redirect to={{
      pathname: '/dashboard',
      state: {user: user, isLoggedIn: isLoggedIn}
    }} />
  );
};

Home.propTypes = {
  user: PropTypes.object,
  isLoggedIn: PropTypes.bool
};

export default Home;
