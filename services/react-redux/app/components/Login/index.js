import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import {
  makeSelectUser, makeSelectCredentials, makeSelectAuthStatus,
  makeSelectTokenExpired
} from 'containers/auth/selectors';

import {
  makeSelectLoading,
  makeSelectError
} from 'containers/App/selectors';

import { authenticateUser, changeUsername, changePassword } from 'containers/auth/actions';

import saga from 'containers/auth/saga';
import reducer from 'containers/auth/reducer';
import Login from './Login';


const mapDispatchToProps = (dispatch) => ({

  onChangeUsername: (evt) => dispatch(changeUsername(evt.target.value)),
  onChangePassword: (evt) => dispatch(changePassword(evt.target.value)),
  onLogin: (evt, credentials) => {
    if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    dispatch(authenticateUser(credentials));
  }
});

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  credentials: makeSelectCredentials(),
  isLoggedIn: makeSelectAuthStatus(),
  tokenExpired: makeSelectTokenExpired()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'auth', reducer });
const withSaga = injectSaga({ key: 'auth', saga });
export default compose(withReducer, withSaga, withConnect)(Login);
export { mapDispatchToProps };
