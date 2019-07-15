import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import ProtectedRoute from './ProtectedRoute';

import {
    makeSelectUser, makeSelectCredentials, makeSelectAuthStatus
  } from 'containers/auth/selectors';
  

const mapStateToProps = createStructuredSelector({
    user: makeSelectUser(),
    credentials: makeSelectCredentials(),
    isLoggedIn: makeSelectAuthStatus()
});
  
const withConnect = connect(mapStateToProps);

export default compose( withConnect)(ProtectedRoute);
