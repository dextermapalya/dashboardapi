import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectUser, makeSelectCredentials, makeSelectAuthStatus
} from 'containers/auth/selectors';
import ProtectedRoute from './ProtectedRoute';


const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  credentials: makeSelectCredentials(),
  isLoggedIn: makeSelectAuthStatus()
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(ProtectedRoute);
