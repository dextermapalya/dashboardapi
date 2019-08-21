import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Log from 'logger-init';

const PublicLayout = (props) => {
  /* eslint-disable no-shadow */
  const {
    Component, route, user, isLoggedIn
  } = props;

  Log.info('Public Layout....');

  return (

    <Component route={route} />
  );
};

PublicLayout.propTypes = {
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  isLoggedIn: PropTypes.bool,
  route: PropTypes.object,
  Component: PropTypes.any
  // location: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};


export default PublicLayout;
