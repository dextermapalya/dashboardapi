import React from 'react';
import PropTypes from 'prop-types';
import Log from 'logger-init';

const PublicLayout = (props) => {
  /* eslint-disable no-shadow */
  Log.info('LAYOUT public', props);
  const {
    Component, route, user, isLoggedIn
  } = props;
  return (
    <Component user={user} isLoggedIn={isLoggedIn} />
  );
};

PublicLayout.propTypes = {
  route: PropTypes.object,
  Component: PropTypes.any,
  user: PropTypes.object,
  isLoggedIn: PropTypes.bool
  // location: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};


export default PublicLayout;
