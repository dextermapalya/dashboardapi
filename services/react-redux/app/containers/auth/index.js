// export { default } from './Authenticate';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  makeSelectLoading,
  makeSelectError
} from 'containers/App/selectors';

import {
  makeSelectUser, makeSelectCredentials, makeSelectAuthStatus,
  makeSelectTokenExpired
} from './selectors';

import { authenticateUser } from './actions';
import reducer from './reducer';
import saga from './saga';
import Authenticate from './Authenticate';
//import { UserActions } from './UserActions';

const mapDispatchToProps = (dispatch) => ({
  onLogin: (evt, credentials) => {
    console.log('DISPATCHING ACTION LOGIN.....', evt, credentials);
    if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    console.log('DISPATCHING ACTION LOGIN', credentials);
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

const withReducer = injectReducer({ key: 'authenticate', reducer });
const withSaga = injectSaga({ key: 'authenticate', saga });
export default compose(withReducer, withSaga, withConnect)(Authenticate);
export { mapDispatchToProps };
